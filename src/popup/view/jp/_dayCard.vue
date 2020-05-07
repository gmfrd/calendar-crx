<template>
  <div>
    <div class="part-day-card" :class="{on: selectedDay.red !== '' }">
      <div class="t1">
        <div class="wrap">
          <div class="b1">{{ selectedDay.Y }}年{{ selectedDay.M }}月</div>
          <div class="b2">{{ selectedDay.D }}日</div>
          <div v-if="selectedDay.event.length" class="b3" v-html="selectedDay.event.join('<br>')" />
          <div v-else class="b3">{{ selectedDay.lMonth }}{{ selectedDay.lDate }}</div>
        </div>
      </div>
      <div class="t2">{{ selectedDay.gzYear }}年【{{ selectedDay.animal }}年】</div>
      <div class="t2">{{ selectedDay.gzMonth }}月{{ selectedDay.gzDate }}日</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 当前天信息(必填)
    selectedDay: {type: Object, required: true},
  },
};
</script>

<style lang="scss">
.part-day-card {
  width: 130px;
  height: 100%;
  background: #37bc9b;
  & > .t1 {
    height: 120px;
    padding-top: 10px;
    padding-bottom: 10px;
    & > .wrap {
      width: 110px;
      margin: 0 auto;
      background: #ff6c7a;
      border-radius: 3px;
      box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1), -1px 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
      & > .b1 {
        font-size: 16px;
        color: #fff;
        height: 24px;
        border-radius: 4px;
      }
      & > .b2 {
        font-size: 26px;
        background: #fff;
        color: #000;
        padding-top: 6px;
        padding-bottom: 6px;
      }
      & > .b3 {
        line-height: 18px;
        max-height: 36px;
        overflow: hidden;
        background: #fff;
        border-radius: 0px 0px 4px 4px;
        color: #000;
        padding-bottom: 8px;
      }
      &.on {
        & > .b2 {
          color: #ed5564;
        }
        & > .b3 {
          color: #ed5564;
        }
      }
    }
  }
  & > .t2 {
    line-height: 20px;
    color: #fff;
    text-align: center;
  }
  & > .line {
    width: 110px;
    height: 2px;
    background: #72d2ba;
    margin: 0 auto;
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
  }
  & > .t3 {
    display: flex;
    color: #fff;
    & > .item {
      height: 210px;
      flex: 1;
      text-align: center;
      & > .b1 {
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 4px;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
      }
      & > .b2 {
        font-size: 14px;
        line-height: 18px;
        height: 180px;
        overflow: hidden;
      }
    }
  }
  &.on {
    background: #ed5564;
    & > .line {
      background: #ff6c7a;
    }
  }
}
</style>
