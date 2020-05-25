<template>
  <div>
    <div class="box-event">
      <!-- 中国,台湾,香港,澳门 -->
      <template v-if="['cn', 'tw', 'hk', 'mo'].includes(region)">
        <div class="item"><i class="t1" :data-d="selectedDay.d" />{{ selectedDay.Y }}年{{ selectedDay.m }}月{{ selectedDay.d }}日 {{ selectedDay.term }} {{ selectedDay.lMonth }}{{ selectedDay.lDate }}  {{ selectedDay.gzYear }}年({{ selectedDay.animal }}年) {{ selectedDay.gzMonth }}月 {{ selectedDay.gzDate }}日</div>
      </template>
      <!-- 日本 -->
      <template v-else-if="['jp'].includes(region)">
        <div class="item"><i class="t1" :data-d="selectedDay.d" />{{ selectedDay.Y }}年（{{ selectedDay.jpNianHao }}）{{ selectedDay.m }}月{{ selectedDay.d }}日 {{ selectedDay.term }}</div>
        <div class="item"><i class="t1" :data-d="selectedDay.d" />{{ selectedDay.lMonth }}{{ selectedDay.lDate }} {{ selectedDay.gzYear }}年({{ selectedDay.animal }}) {{ selectedDay.gzMonth }}月 {{ selectedDay.gzDate }}日 {{ selectedDay.liuYao }}</div>
      </template>
      <!-- 美国 -->
      <div v-else-if="['us'].includes(region)" class="item"><i class="t1" :data-d="selectedDay.d" />{{ langEnumMonth[selectedDay.m] }} {{ selectedDay.d }}, {{ selectedDay.Y }}</div>
      <div v-if="selectedDay.long !== ''" class="item"><i class="t2" />{{ selectedDay.long }}</div>
    </div>
  </div>
</template>

<script>
import * as calendar from '../../../lib/calendar';

export default {
  props: {
    // 当前选中天数据
    selectedDay: {type: Object, required: true},
    // 国家
    region: {type: String, required: true},
  },
  data: function() {
    return {
      // 月枚举
      langEnumMonth: calendar.getLangEnumMonth(this.region),
    };
  },
};
</script>

<style lang="scss" scoped>
.box-event {
  border-top: 1px solid rgb(230, 236, 240);
  font-size: 14px;
  line-height: 20px;
  color: rgb(101, 119, 134);
  padding: 6px 10px;
  & > .item {
    position: relative;
    text-indent: 20px;
    & > i {
      position: absolute;
      top: 2px;
      left: 0;
      display: block;
      width: 16px;
      height: 16px;
      background: url(./../../icon/calendar.png);
      background-size: contain;
      &[data-d='1'] { background-image: url(./../../icon/cal/cal_1.png); }
      &[data-d='2'] { background-image: url(./../../icon/cal/cal_2.png); }
      &[data-d='3'] { background-image: url(./../../icon/cal/cal_3.png); }
      &[data-d='4'] { background-image: url(./../../icon/cal/cal_4.png); }
      &[data-d='5'] { background-image: url(./../../icon/cal/cal_5.png); }
      &[data-d='6'] { background-image: url(./../../icon/cal/cal_6.png); }
      &[data-d='7'] { background-image: url(./../../icon/cal/cal_7.png); }
      &[data-d='8'] { background-image: url(./../../icon/cal/cal_8.png); }
      &[data-d='9'] { background-image: url(./../../icon/cal/cal_9.png); }
      &[data-d='10'] { background-image: url(./../../icon/cal/cal_10.png); }
      &[data-d='11'] { background-image: url(./../../icon/cal/cal_11.png); }
      &[data-d='12'] { background-image: url(./../../icon/cal/cal_12.png); }
      &[data-d='13'] { background-image: url(./../../icon/cal/cal_13.png); }
      &[data-d='14'] { background-image: url(./../../icon/cal/cal_14.png); }
      &[data-d='15'] { background-image: url(./../../icon/cal/cal_15.png); }
      &[data-d='16'] { background-image: url(./../../icon/cal/cal_16.png); }
      &[data-d='17'] { background-image: url(./../../icon/cal/cal_17.png); }
      &[data-d='18'] { background-image: url(./../../icon/cal/cal_18.png); }
      &[data-d='19'] { background-image: url(./../../icon/cal/cal_19.png); }
      &[data-d='20'] { background-image: url(./../../icon/cal/cal_20.png); }
      &[data-d='21'] { background-image: url(./../../icon/cal/cal_21.png); }
      &[data-d='22'] { background-image: url(./../../icon/cal/cal_22.png); }
      &[data-d='23'] { background-image: url(./../../icon/cal/cal_23.png); }
      &[data-d='24'] { background-image: url(./../../icon/cal/cal_24.png); }
      &[data-d='25'] { background-image: url(./../../icon/cal/cal_25.png); }
      &[data-d='26'] { background-image: url(./../../icon/cal/cal_26.png); }
      &[data-d='27'] { background-image: url(./../../icon/cal/cal_27.png); }
      &[data-d='28'] { background-image: url(./../../icon/cal/cal_28.png); }
      &[data-d='29'] { background-image: url(./../../icon/cal/cal_29.png); }
      &[data-d='30'] { background-image: url(./../../icon/cal/cal_30.png); }
      &[data-d='31'] { background-image: url(./../../icon/cal/cal_31.png); }
      &.t2 {
        background-image: url(./../../icon/event.png);
      }
    }
  }
}
</style>
