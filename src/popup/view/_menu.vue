<template>
  <div class="part-menu">
    <div class="list">
      <div class="item" @click="toSetting"><i class="setting" /></div>
      <div class="item" @click="toAbout"><i class="about" /></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toSetting() {
      this.$emit('toSetting');
    },
    toAbout() {
      this.$emit('toAbout');
    },
  },
};
</script>

<style lang="scss">
.part-menu {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  & > .list {
    display: flex;
    & > .item {
      padding: 5px;
      cursor: pointer;
      & > i {
        display: block;
        width: 16px;
        height: 16px;
        background: url(../icon/setting.png);
        background-size: contain;
        &.about {
          background-image: url(../icon/info.png);
        }
      }
    }
  }
}
</style>
