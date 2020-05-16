<template>
  <div>
    <div class="box-event">
      <div class="item"><i class="t1" />{{ selectedDay.gzYear }}年({{ selectedDay.animal }}年) {{ selectedDay.lMonth }}({{ selectedDay.gzMonth }}月) {{ selectedDay.lDate }}({{ selectedDay.gzDate }}日) {{ selectedDay.term }}</div>
      <div v-for="(v,index) in selectedDay.event" :key="index" class="item"><i class="t2" />{{ v }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 当前选中天数据
    selectedDay: {type: Object, required: true},
    // 国家
    region: {type: String, required: true},
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
