<template>
  <div>
    <button @click="relativeCalendar(-1)">上</button>
    <button @click="relativeCalendar(1)">下</button>
    <button v-if="caYear !== today.Y || caMonth !== today.m" @click="toCalendar(today.Y, today.m, today.d)">今</button>
    <p>{{ caYear }}-{{ caMonth }}</p>
    <div class="calendar">
      <div>
        <span v-for="(v, index) in caWeekArr" :key="index">{{ v }}</span>
      </div>
      <div class="list">
        <div
          v-for="(v, index) in caDayArr"
          :key="index"
          class="item"
          :class="{
            month: v.Y === caYear && v.m === caMonth,
            weekend: [0, 6].includes(v.w),
            today: today && today.v === v.v,
            selected: selectedDay && selectedDay.v === v.v
          }"
          @click="toCalendar(v.Y, v.m, v.d)"
        >
          <div class="t1">{{ v.d }}</div>
          <div class="t2">十二</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as calendar from '../lib/calendar';

export default {
  data: () => {
    return {
      // 日历显示的年月
      caYear: 0,
      caMonth: 0,
      caDayArr: [],
      caWeekArr: [],
      // 今天
      today: null,
      // 选中的天
      selectedDay: null,
      // 每周起始周几
      firstDayOfWeek: 1,
    };
  },
  created() {
    this.today = calendar.getToday();
    this.toCalendar(this.today.Y, this.today.m, this.today.d);
  },
  methods: {
    // 日历绝对切换
    toCalendar(year, month, day = false) {
      if (this.caYear !== year || this.caMonth !== month) {
        this.caYear = year;
        this.caMonth = month;
        const data = calendar.getCalendar(year, month, this.firstDayOfWeek);
        this.caDayArr = data.dayArr;
        this.caWeekArr = data.weekArr;
      }
      if (day !== false) {
        for (const v of this.caDayArr) {
          if (v.d === day) {
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
  },
};
</script>

<style lang="scss" scoped>
.list { width: 350px; }
.list > .item {
  position: relative;
  box-sizing: border-box;
  width: 50px;
  height: 40px;
  float: left;
  text-align: center;
  cursor: pointer;
  transition: all 100ms linear;
  border: 1px solid #fff;
}
.list > .item > .t1 { color: #bfbfbf; font-size: 16px; line-height: 20px; margin-top: 2px; }
.list > .item > .t2 { color: #bfbfbf; font-size: 12px; line-height: 14px; }
.list > .item > .t3 {
  position: absolute;
  top: 1px;
  right: 1px;
  width: 12px;
  height: 12px;
  background-size: contain;
  opacity: 0.5;
}
.list > .item > .t4 {
  position: absolute;
  top: 1px;
  right: 1px;
  width: 12px;
  height: 12px;
  background-size: contain;
  opacity: 0.5;
}
.list > .item > .t5 {
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
}
.list > .item.month {  }
.list > .item.month > .t1 { color: #000; }
.list > .item.month > .t2 { color: #666; }
.list > .item.month.weekend > .t1 { color: #e02d2d; }
.list > .item.today { background: #d2e3fc; }
.list > .item.today > .t1 {  }
.list > .item.today:hover {
  background: #aecbfa;
}
.list > .item:hover { background: #f1f3f4; }
.list > .item:hover {
  background: #f1f3f4;
}
.list > .item:active {
  background: #e8eaed
}
.list > .item:active:hover {
  background: #dadce0
}
</style>
