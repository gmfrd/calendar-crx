<template>
  <div>
    <div v-if="selectedDay" class="box-main" :class="{on: selectedDay.red !== '' }">
      <div class="box-left">
        <div class="box-btn">
          <!-- 年份 -->
          <div class="select-group">
            <div class="select">
              <div class="label">{{ caYear }}年</div>
              <div class="open" />
              <select v-model="optionYear" @change="toCalendar(optionYear, optionMonth)">
                <option v-for="v in optionYearArr" :key="v" :value="v">{{ v }}年</option>
              </select>
            </div>
          </div>
          <!-- 月份 -->
          <div class="select-group">
            <div class="btn arrow" @click="relativeCalendar(-1)"><i /></div>
            <div class="select">
              <div class="label">{{ caMonth }}月</div>
              <div class="open" />
              <select v-model="optionMonth" @change="toCalendar(optionYear, optionMonth)">
                <option v-for="v in optionMonthArr" :key="v" :value="v">{{ v }}月</option>
              </select>
            </div>
            <div class="btn arrow right" @click="relativeCalendar(1)"><i /></div>
          </div>
          <!-- 今天 -->
          <div class="btn today" @click="toCalendar(today.Y, today.m, today.d)">返回今天</div>
        </div>
        <div class="box-week">
          <div v-for="v in caWeekArr" :key="v" class="item" :class="{on: [0, 6].includes(v)}">{{ enumWeek[v] }}</div>
        </div>
        <div class="row box-cal">
          <div
            v-for="(v, index) in caDayArr"
            :key="index"
            class="col item"
            @click="toCalendar(v.Y, v.m, v.d)"
          >
            <div
              class="wrap"
              :class="{
                month: v.Y === caYear && v.m === caMonth,
                weekend: [0, 6].includes(v.w),
                jia: v.status === 1,
                ban: v.status === 2,
                today: today && today.v === v.v,
                selected: selectedDay && selectedDay.v === v.v
              }"
            >
              <div class="t1">{{ v.d }}</div>
              <div v-if="v.red === ''" class="t2">{{ v.lDate }}</div>
              <div v-else class="t2 on">{{ v.red }}</div>
              <div v-if="v.status === 1" class="icon jia" />
              <div v-if="v.status === 2" class="icon ban" />
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧当日信息卡片 -->
      <PartDayCard class="box-right" :selected-day="selectedDay" />
    </div>
  </div>
</template>

<script>
import * as calendar from '../../../lib/calendar';
import * as ganzhi from '../../../lib/ganzhi';
import * as lunar from '../../../lib/lunar';
import * as term from '../../../lib/term';
import * as api from '../../../lib/api';
import PartDayCard from './_dayCard.vue';

export default {
  components: {
    PartDayCard,
  },
  props: {
    // 每周起始周几
    firstDayOfWeek: {type: Number, required: true},
  },
  data: () => {
    return {
      // 周枚举
      enumWeek: ['日', '一', '二', '三', '四', '五', '六'],
      // 最小年份
      minYear: 1950,
      // 最大年份
      maxYear: 2050,
      // 年份列表
      optionYearArr: [],
      // 月份列表
      optionMonthArr: [],
      // 选择框的年月
      optionYear: 0,
      optionMonth: 0,
      // 日历显示的年月
      caYear: 0,
      caMonth: 0,
      caDayArr: [],
      caWeekArr: [],
      // 今天
      today: null,
      // 选中的天
      selectedDay: null,
    };
  },
  created() {
    // 年份列表
    for (let i = this.minYear; i <= this.maxYear; i++) {
      this.optionYearArr.push(i);
    }
    // 月份列表
    for (let i = 1; i <= 12; i++) {
      this.optionMonthArr.push(i);
    }
    this.today = calendar.getToday();
    this.toCalendar(this.today.Y, this.today.m, this.today.d);
  },
  methods: {
    // 日历绝对切换
    toCalendar(year, month, day = false) {
      if (year < this.minYear || year > this.maxYear) {
        return;
      }
      if (this.caYear !== year || this.caMonth !== month) {
        this.caYear = year;
        this.caMonth = month;
        this.optionYear = year;
        this.optionMonth = month;
        const data = calendar.getCalendar(year, month, this.firstDayOfWeek);
        // 获取并渲染节假日信息
        this.caDayArr = this.renderHoliday(data.dayArr);
        // 周菜单
        this.caWeekArr = data.weekArr;
      }
      if (day !== false) {
        for (const v of this.caDayArr) {
          if (v.Y === year && v.m === month && v.d === day) {
            this.selectedDay = v;
            break;
          }
        }
      }
    },
    // 日历相对切换(-1,1)
    relativeCalendar(diffMonth = 0) {
      const ym = calendar.getRelativeMonth(this.caYear, this.caMonth, diffMonth);
      this.toCalendar(ym.year, ym.month);
    },
    // 获取并渲染节假日
    renderHoliday(list) {
      // 日历中的年份
      const yearArr = [];
      // 日历节日字段初始化
      for (let i = 0; i < list.length; i++) {
        const v = list[i];
        const gzInfo = ganzhi.getDay(v.Y, v.m, v.d, 'tw');
        const lunarInfo = lunar.getDay(v.Y, v.m, v.d, 'tw');
        const termInfo = term.getDay(v.Y, v.m, v.d, 'tw');
        v['status'] = 0; // 状态(0正常1假2班)
        v['animal'] = gzInfo.animal; // 生肖
        v['gzYear'] = gzInfo.gzYearName; // 干支年
        v['gzMonth'] = gzInfo.gzMonthName; // 干支月
        v['gzDate'] = gzInfo.gzDayName; // 干支日
        v['lMonth'] = lunarInfo.lunarMonthName; // 农历月
        v['lDate'] = lunarInfo.lunarDayName; // 农历日
        v['term'] = termInfo; // 节气
        v['red'] = termInfo; // 红色内容
        v['event'] = []; // 节日
        v['suit'] = ''; // 宜
        v['avoid'] = ''; // 忌
        list[i] = v;
        // 日历中的年份
        if (! yearArr.includes(v.Y)) {
          yearArr.push(v.Y);
        }
      }
      // 获取每年的节假日信息
      for (const Y of yearArr) {
        api.getCalRegionYearData('hk', Y).then((extArr) => {
          if (! extArr) return;
          this.caDayArr.forEach((caDay) => {
            const key = `D${caDay.M}${caDay.D}`;
            if (extArr[key]) {
              const ext = extArr[key];
              caDay.red = ext[0].length ? ext[0][0] : ''; // 事件数组
              caDay.event = ext[0]; // 事件
              caDay.status = ext[1]; // 状态(0正常1假2班)
              caDay.suit = ext[8]; // 宜
              caDay.avoid = ext[9]; // 忌
            }
          });
        });
      }
      return list;
    },
  },
};
</script>

<style lang="scss">
.box-main {
  display: flex;
  width: 535px;
  height: 435px;
  border: 2px solid #37bc9b;
  border-right: 0;
  .box-left {
    box-sizing: border-box;
    padding: 0 10px 10px 10px;
    width: 405px;
    .box-btn {
      display: flex;
      height: 46px;
      align-items: center;
      & .btn {
        font-size: 14px;
        line-height: 24px;
        height: 24px;
        border: 1px solid #d8d8d8;
        cursor: pointer;
        text-align: center;
        padding: 2px 10px;
        color: #3c4043;
        background-color: transparent;
        transition: background-color 100ms linear;
        &:hover {
          background-color: #f1f3f4
        }
        &:focus {
          background-color: #e8eaed
        }
        &:focus:hover {
          background-color: #dadce0
        }
      }
      & > .select-group {
        display: flex;
        margin-right: 10px;
        & > .select {
          position: relative;
          min-width: 40px;
          font-size: 14px;
          line-height: 24px;
          height: 24px;
          border: 1px solid #999;
          border-bottom-color: #d8d8d8;
          border-right-color: #d8d8d8;
          cursor: pointer;
          text-align: center;
          padding: 2px 10px;
          padding-right: 20px;
          color: #3c4043;
          background-color: transparent;
          transition: background-color 100ms linear;
          & > .open {
            position: absolute;
            top: 12px;
            right: 5px;
            height: 0;
            border: 5px solid transparent;
            border-top-color: #80868b;
          }
          & > select {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            border: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
          &:hover {
            background-color: #f1f3f4;
            box-shadow: inset 1px 1px 0 0 #d8d8d8;
          }
          &:focus {
            background-color: #e8eaed;
          }
          &:focus:hover {
            background-color: #dadce0;
          }
        }
        & > .arrow {
          padding-left: 10px;
          padding-right: 15px;
          border-right-width: 0;
          & > i {
            display: block;
            height: 0;
            border: 5px solid transparent;
            border-right-color: #80868b;
            margin-top: 6px;
          }
          &.right {
            padding-left: 15px;
            padding-right: 10px;
            border-right-width: 1px;
            border-left-width: 0;
            & > i {
              border-color: transparent;
              border-left-color: #80868b;
            }
          }
        }
      }
      & > .today {
        margin-left: auto;
        margin-right: 0;
      }
    }
    .box-week {
      height: 34px;
      border-top: 1px solid #37bc9b;
      display: flex;
      align-items: center;
      & > .item {
        flex: 1;
        text-align: center;
        &.on {
          color: #ed5564;
        }
      }
    }
    .box-cal {
      & > .item {
        box-sizing: border-box;
        width: 55px;
        height: 55px;
        cursor: pointer;
        transition: all 100ms linear;
        border-top: 1px solid #c8cacc;
        & > .wrap {
          box-sizing: border-box;
          height: 100%;
          border: 2px solid #fff;
          position: relative;
          & > .t1 {
            color: #bfbfbf;
            font-size: 20px;
            line-height: 24px;
            height: 24px;
            margin-top: 4px;
            text-align: center;
          }
          & > .t2 {
            color: #bfbfbf;
            font-size: 12px;
            line-height: 14px;
            height: 14px;
            margin-top: 2px;
            text-align: center;
            overflow: hidden;
          }
          & > .icon {
            position: absolute;
            top: -1px;
            left: -1px;
            width: 16px;
            height: 16px;
            background: url(./../../icon/jia.png) no-repeat;
            background-size: contain;
            color: #fff;
            z-index: 1;
            opacity: 0.2;
            &.ban {
              background-image: url(./../../icon/ban.png);
            }
          }
          &.month {
            & > .t1 {
              color: #000;
            }
            & > .t2 {
              color: #333;
              &.on {
                color: #ed5564;
              }
            }
            & > .icon {
              opacity: 1;
            }
            &.weekend {
              & > .t1 {
                color: #ed5564;
              }
            }
            &.today {
              border-color: #fb0;
              background: #fb0;
              & > .t1 {
                color: #fff;
              }
            }
          }
          &.jia {
            background: #fff0f0;
            border-color: #fff0f0;
          }
          &.ban {
            background: #f5f5f5;
            border-color: #f5f5f5;
          }
          &.selected {
            border-color: #fb0;
          }
          &:hover{
            border-color: #fb0;
          }
        }
      }
    }
  }
  &.on {
    border-color: #ed5564;
  }
}
</style>
