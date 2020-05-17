<template>
  <div>
    <div class="box-event">
      <!-- 中国,台湾,香港,澳门 -->
      <template v-if="['cn', 'tw', 'hk', 'mo'].includes(region)">
        <div class="item"><i class="t1" />{{ selectedDay.Y }}年{{ selectedDay.m }}月{{ selectedDay.d }}日 {{ selectedDay.term }}</div>
        <div class="item"><i class="t1" />农历：{{ selectedDay.lMonth }}{{ selectedDay.lDate }} / 干支：{{ selectedDay.gzYear }}年({{ selectedDay.animal }}年){{ selectedDay.gzMonth }}月{{ selectedDay.gzDate }}日</div>
      </template>
      <!-- 日本 -->
      <template v-else-if="['jp'].includes(region)">
        <div class="item"><i class="t1" />{{ selectedDay.Y }}年（{{ selectedDay.jpNianHao }}）{{ selectedDay.m }}月{{ selectedDay.d }}日 {{ selectedDay.term }}</div>
        <div class="item"><i class="t1" />旧暦：{{ selectedDay.lMonth }}{{ selectedDay.lDate }} / 干支：{{ selectedDay.gzYear }}年({{ selectedDay.animal }}){{ selectedDay.gzMonth }}月{{ selectedDay.gzDate }}日 / 六曜：{{ selectedDay.liuYao }}</div>
      </template>
      <!-- 美国 -->
      <div v-else-if="['us'].includes(region)" class="item"><i class="t1" />{{ langEnumMonth[selectedDay.m] }} {{ selectedDay.d }}, {{ selectedDay.Y }}</div>
      <div v-for="(v,index) in selectedDay.event" :key="index" class="item"><i class="t2" />{{ v }}</div>
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
      &.t2 {
        background-image: url(./../../icon/event.png);
      }
    }
  }
}
</style>
