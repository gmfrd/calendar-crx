<template>
  <div class="app">
    <!-- 日历页面 -->
    <PageCalendar v-if="calIsShow" :region="region" :first-day-of-week="firstDayOfWeek" @moreBtnClick="openPageSetting" />
    <!-- 设置页面 -->
    <PageSetting v-if="settingIsShow" @close="settingClose" />
  </div>
</template>

<script>
import * as storage from '../lib/storage';
import PageCalendar from './view/calendar/index.vue';
import PageSetting from './view/setting/index.vue';

export default {
  components: {
    PageCalendar,
    PageSetting,
  },
  data: () => {
    return {
      // 地区
      region: '',
      // 每周开始于
      firstDayOfWeek: 0,
      // 日历是否显示
      calIsShow: false,
      // 设置页面是否显示
      settingIsShow: false,
      // 关于页面是否显示
      aboutIsShow: false,
    };
  },
  created() {
    // 初始化配置
    this.initSetting();
    if (this.region === '') {
      this.settingIsShow = true;
    } else {
      this.calIsShow = true;
    }
  },
  methods: {
    // 初始化配置
    initSetting() {
      // 地区
      const region = storage.getItem('setting.region');
      this.region = region !== false ? region.data : '';
      // 每周开始于
      const firstDayOfWeek = storage.getItem('setting.firstDayOfWeek');
      this.firstDayOfWeek = parseInt(firstDayOfWeek !== false ? firstDayOfWeek.data : 0);
    },
    // 打开设置页面
    openPageSetting() {
      this.calIsShow = false;
      this.settingIsShow = true;
    },
    // 关闭设置页面
    settingClose() {
      // 初始化配置
      this.initSetting();
      this.settingIsShow = false;
      this.calIsShow = true;
    },
  },
};
</script>

<style lang="scss">
.app {
  position: relative;
}
.aaa {
  margin-left: 100px;
  margin-top: 100px;
  display: flex;
  .btn {
    font-size: 14px;
    line-height: 36px;
    padding: 0 8px;
    color: #1a73e8;
    background-color: transparent;
    border-radius: 3px;
    background: transparent;
    cursor: pointer;
    transition: background-color 15ms linear;
    user-select: none;
    &:hover {
      background-color: rgba(28, 116, 233, 0.04);
    }
    &:active {
      background-color: rgba(28, 116, 233, 0.16);
      transition: background-color 200ms linear;
    }
    &.btn2 {
      &:hover {
        background-color: rgba(95, 99, 104, 0.04);
      }
      &:active {
        background-color: rgba(95, 99, 104, 0.16);
      }
    }
  }
}
</style>
