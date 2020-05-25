<template>
  <div>
    <div
      v-if="selectedDay"
      class="box-main"
      :class="{
        jp: region === 'jp',
        us: region === 'us',
      }"
    >
      <div class="box-btn">
        <template v-if="['us'].includes(region)">
          <!-- 月份 -->
          <div class="select-group">
            <div class="g-select select">
              <div class="label">{{ langEnumMonth[caMonth] }}</div>
              <div class="arrow" />
              <select v-model="optionMonth" @change="toCalendar(optionYear, optionMonth)">
                <option v-for="v in optionMonthArr" :key="v" :value="v">{{ langEnumMonth[v] }}</option>
              </select>
            </div>
          </div>
          <!-- 年份 -->
          <div class="select-group">
            <div class="g-select select">
              <div class="label">{{ caYear }}{{ langYear }}</div>
              <div class="arrow" />
              <select v-model="optionYear" @change="toCalendar(optionYear, optionMonth)">
                <option v-for="v in optionYearArr" :key="v" :value="v">{{ v }}{{ langYear }}</option>
              </select>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- 年份 -->
          <div class="select-group">
            <div class="g-select select">
              <div class="label">{{ caYear }}{{ langYear }}</div>
              <div class="arrow" />
              <select v-model="optionYear" @change="toCalendar(optionYear, optionMonth)">
                <option v-for="v in optionYearArr" :key="v" :value="v">{{ v }}{{ langYear }}</option>
              </select>
            </div>
          </div>
          <!-- 月份 -->
          <div class="select-group">
            <div class="g-select select">
              <div class="label">{{ langEnumMonth[caMonth] }}</div>
              <div class="arrow" />
              <select v-model="optionMonth" @change="toCalendar(optionYear, optionMonth)">
                <option v-for="v in optionMonthArr" :key="v" :value="v">{{ langEnumMonth[v] }}</option>
              </select>
            </div>
          </div>
        </template>
        <!-- 分割 -->
        <div class="split-line" />
        <!-- 月份切换 -->
        <div class="g-arrow" @click="relativeCalendar(-1)"><i /></div>
        <div class="g-arrow now" @click="toCalendar(today.Y, today.m, today.d)"><i /></div>
        <div class="g-arrow right" @click="relativeCalendar(1)"><i /></div>
        <!-- 设置 -->
        <div class="g-arrow setting" @click="toSetting"><i /></div>
      </div>
      <!-- 周 -->
      <div class="box-week">
        <div v-for="v in caWeekArr" :key="v" class="item" :class="{on: [0, 6].includes(v)}">{{ langEnumWeek[v] }}</div>
      </div>
      <!-- 日历 -->
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
              gon: v.status === 3,
              today: today && today.v === v.v,
              selected: selectedDay && selectedDay.v === v.v
            }"
          >
            <!-- 日期 -->
            <div class="t1">{{ v.d }}</div>
            <!-- 摘要 -->
            <div class="t2" :class="{on: v.shortIsOn}">{{ v.short }}</div>
            <!-- 假/班/公 -->
            <div v-if="v.status === 1" class="status jia">{{ langJiaBan[0] }}</div>
            <div v-if="v.status === 2" class="status ban">{{ langJiaBan[1] }}</div>
            <div v-if="v.status === 3" class="status gon">{{ langJiaBan[2] }}</div>
            <!--
              <div v-if="v.status === 1" class="icon jia" />
              <div v-if="v.status === 2" class="icon ban" />
              -->
          </div>
        </div>
      </div>
      <!-- 该日详情 -->
      <PartCalendarBoxEvent :selected-day="selectedDay" :region="region" />
    </div>
  </div>
</template>

<script>
import * as calendar from '../../../lib/calendar';
import * as ganzhi from '../../../lib/ganzhi';
import * as lunar from '../../../lib/lunar';
import * as term from '../../../lib/term';
import * as liuYao from '../../../lib/liuYao';
import * as jpNianHao from '../../../lib/jpNianHao';
import * as api from '../../../lib/api';
import PartCalendarBoxEvent from './_boxEvent.vue';

export default {
  components: {
    PartCalendarBoxEvent,
  },
  props: {
    // 国家
    region: {type: String, required: true},
    // 每周起始周几
    firstDayOfWeek: {type: String, required: true},
  },
  data: function() {
    return {
      // 多语言.年
      langYear: calendar.getLangYear(this.region),
      // 多语言.月枚举
      langEnumMonth: calendar.getLangEnumMonth(this.region),
      // 多语言.周枚举
      langEnumWeek: calendar.getLangEnumWeek(this.region),
      // 多语言.假班
      langJiaBan: calendar.getLangJiaBan(this.region),
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
        const data = calendar.getCalendar(year, month, parseInt(this.firstDayOfWeek));
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
        v['status'] = 0; // 状态(0无1假2班3公务人员假)
        v['short'] = ''; // 摘要
        v['shortIsOn'] = false; // 摘要是否红色
        v['long'] = ''; // 描述
        v['suit'] = ''; // 宜
        v['avoid'] = ''; // 忌
        // 中国
        if (['cn'].includes(this.region)) {
          const gzInfo = ganzhi.getDay(v.Y, v.m, v.d, 'cn');
          const lunarInfo = lunar.getDay(v.Y, v.m, v.d, 'cn');
          const termInfo = term.getDay(v.Y, v.m, v.d, 'cn');
          v['animal'] = gzInfo.animal; // 生肖
          v['gzYear'] = gzInfo.gzYearName; // 干支年
          v['gzMonth'] = gzInfo.gzMonthName; // 干支月
          v['gzDate'] = gzInfo.gzDayName; // 干支日
          v['lMonth'] = lunarInfo.lunarMonthName; // 农历月
          v['lDate'] = lunarInfo.lunarDayName; // 农历日
          v['term'] = termInfo; // 节气
          if (termInfo !== '') {
            v['short'] = termInfo;
            v['shortIsOn'] = true;
          } else {
            v['short'] = v['lDate'];
          }
        }
        // 台湾,香港,澳门
        if (['tw', 'hk', 'mo'].includes(this.region)) {
          const gzInfo = ganzhi.getDay(v.Y, v.m, v.d, 'tw');
          const lunarInfo = lunar.getDay(v.Y, v.m, v.d, 'tw');
          const termInfo = term.getDay(v.Y, v.m, v.d, 'tw');
          v['animal'] = gzInfo.animal; // 生肖
          v['gzYear'] = gzInfo.gzYearName; // 干支年
          v['gzMonth'] = gzInfo.gzMonthName; // 干支月
          v['gzDate'] = gzInfo.gzDayName; // 干支日
          v['lMonth'] = lunarInfo.lunarMonthName; // 农历月
          v['lDate'] = lunarInfo.lunarDayName; // 农历日
          v['term'] = termInfo; // 节气
          if (termInfo !== '') {
            v['short'] = termInfo;
            v['shortIsOn'] = true;
          } else {
            v['short'] = v['lDate'];
          }
        }
        // 日本
        if (['jp'].includes(this.region)) {
          const gzInfo = ganzhi.getDay(v.Y, v.m, v.d, 'tw');
          const lunarInfo = lunar.getDay(v.Y, v.m, v.d, 'tw');
          const termInfo = term.getDay(v.Y, v.m, v.d, 'tw');
          const liuYaoInfo = liuYao.getDay(lunarInfo.lunarMonth, lunarInfo.lunarDay);
          const jpNianHaoInfo = jpNianHao.getYear(v.Y);
          v['animal'] = gzInfo.animal; // 生肖
          v['gzYear'] = gzInfo.gzYearName; // 干支年
          v['gzMonth'] = gzInfo.gzMonthName; // 干支月
          v['gzDate'] = gzInfo.gzDayName; // 干支日
          v['lMonth'] = lunarInfo.lunarMonthName; // 农历月
          v['lDate'] = lunarInfo.lunarDayName; // 农历日
          v['term'] = termInfo; // 节气
          v['liuYao'] = liuYaoInfo; // 六曜
          v['jpNianHao'] = jpNianHaoInfo; // 日本年号
          if (termInfo !== '') {
            v['short'] = termInfo;
            v['shortIsOn'] = true;
          } else {
            v['short'] = v['liuYao'];
          }
        }
        // 美国
        if (['us'].includes(this.region)) {
          // 无
        }
        list[i] = v;
        // 日历中的年份
        if (! yearArr.includes(v.Y)) {
          yearArr.push(v.Y);
        }
      }
      // 获取每年的节假日信息
      for (const Y of yearArr) {
        api.getCalRegionYearData(this.region, Y).then((extArr) => {
          if (! extArr) return;
          this.caDayArr.forEach((caDay) => {
            if (caDay.Y === Y) {
              const key = `D${caDay.M}${caDay.D}`;
              if (typeof extArr[key] === 'string') {
                const extTmp = extArr[key].split(';');
                const status = parseInt(extTmp[0]);
                const short = typeof extTmp[1] === 'string' ? extTmp[1] : '';
                let long = typeof extTmp[2] === 'string' ? extTmp[2] : '';
                if (long === '') {
                  long = short;
                }
                // 赋值
                caDay.status = status;
                if (short !== '') {
                  caDay.short = short;
                  caDay.shortIsOn = true;
                }
                if (long !== '') {
                  caDay.long = long;
                }
              }
            }
          });
        });
      }
      return list;
    },
    // 更多按钮点击
    toSetting() {
      this.$emit('toSetting');
    },
  },
};
</script>

<style lang="scss" scoped>
.box-main {
  box-sizing: border-box;
  width: 450px;
  & > .box-btn {
    user-select: none;
    display: flex;
    height: 50px;
    align-items: center;
    background: #f5f8fa;
    padding-left: 10px;
    padding-right: 10px;
    & > .select-group {
      display: flex;
      margin-right: 10px;
    }
    & > .split-line {
      margin-left: auto;
    }
    & > .today {
      margin-right: 0;
    }
    & > .g-arrow {
      margin-left: 4px;
    }
  }
  & > .box-week {
    user-select: none;
    padding-left: 10px;
    padding-right: 10px;
    height: 34px;
    border-top: 1px solid rgb(230, 236, 240);
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
  & > .box-cal {
    user-select: none;
    padding-left: 10px;
    padding-right: 10px;
    & > .item {
      box-sizing: border-box;
      width: 14.28%;
      height: 54px;
      cursor: pointer;
      border-top: 1px solid rgb(230, 236, 240);
      & > .wrap {
        box-sizing: border-box;
        height: 100%;
        border: 1px solid #fff;
        position: relative;
        transition: background-color,border-color 0.1s linear;
        & > .t1 {
          color: rgba(0, 0, 0, 0.1);
          font-size: 20px;
          line-height: 24px;
          height: 24px;
          margin-top: 4px;
          text-align: center;
          font-weight: bold;
        }
        & > .t2 {
          color: #bfbfbf;
          font-size: 12px;
          line-height: 14px;
          height: 14px;
          margin-top: 2px;
          text-align: center;
          overflow: hidden;
          word-break:break-all;
          padding-left: 2px;
          padding-right: 2px;
        }
        & > .status {
          position: absolute;
          top: -1px;
          left: -1px;
          width: 16px;
          height: 16px;
          background: #ed5564;
          background-size: contain;
          color: #fff;
          z-index: 1;
          opacity: 0.1;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
          &.ban {
            background: #969799;
          }
          &.gon {
            color: #ed5564;
            background: transparent;
          }
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
          opacity: 0.1;
          &.ban {
            background-image: url(./../../icon/ban.png);
          }
        }
        &.month {
          & > .t1 {
            color: rgb(0, 0, 0);
          }
          & > .t2 {
            color: #333;
            &.on {
              color: #ed5564;
            }
          }
          & > .status {
            opacity: 1;
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
            border-color: rgb(29, 161, 242);
            background: rgb(29, 161, 242);
            & > .t1 {
              color: #fff;
            }
            & > .t2 {
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
        &.gon {
          background: #fff0f0;
          border-color: #fff0f0;
        }
        &.selected {
          border-color: rgb(29, 161, 242);
          background-color:rgba(29, 161, 242, 0.1);
        }
        &:hover{
          border-color: rgb(29, 161, 242);
          background-color:rgba(29, 161, 242, 0.1);
          &.month {
            &.today {
              background: rgb(26, 145, 218);
              border-color: rgb(26, 145, 218);
            }
          }
        }
        &:active {
          background-color:rgba(29, 161, 242, 0.2);
        }
      }
    }
  }
  &.us {
    & > .box-week {
      & > .item {
        &.on {
          color: rgb(29, 161, 242);
        }
      }
    }
    & > .box-cal {
      & > .item {
        & > .wrap {
          & > .t1 {
            margin-top: 14px;
          }
          & > .t2 {
            margin-top: 0;
          }
          &.month {
            &.weekend {
              & > .t1 {
                color: rgb(29, 161, 242);
              }
            }
            &.today {
              & > .t1 {
                color: #fff;
              }
              & > .t2 {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
