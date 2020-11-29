<template>
  <div class="app">
    <!-- 日历页面 -->
    <PageCalendar v-if="calIsShow" :region="confRegion" :first-day-of-week="confFirstDayOfWeek" @toSetting="openPageSetting" />
    <!-- 设置页面 -->
    <PageSetting v-if="settingIsShow" @close="closePageSetting" />
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
      // 配置.是否是否初始化过
      confIsInit: true,
      // 配置.地区
      confRegion: '',
      // 配置.每周开始于
      confFirstDayOfWeek: '',

      // 日历是否显示
      calIsShow: false,
      // 设置页面是否显示
      settingIsShow: false,
    };
  },
  created() {
    // 初始化配置
    this.initConf();
    // 判断是否展示配置
    if (! this.confIsInit) {
      this.settingIsShow = true;
    } else {
      this.calIsShow = true;
    }
  },
  methods: {
    // 初始化配置
    initConf() {
      // 配置.是否是否初始化过
      const confIsInit = storage.getItem('conf.isInit');
      this.confIsInit = confIsInit !== false ? true : false;
      // 配置.地区
      const confRegion = storage.getItem('conf.region');
      this.confRegion = confRegion !== false ? confRegion.data : 'cn';
      // 配置.每周开始于
      const confFirstDayOfWeek= storage.getItem('conf.firstDayOfWeek');
      this.confFirstDayOfWeek = confFirstDayOfWeek !== false ? confFirstDayOfWeek.data : '0';
    },
    // 打开设置页面
    openPageSetting() {
      this.calIsShow = false;
      this.settingIsShow = true;
    },
    // 关闭设置页面
    closePageSetting() {
      // 初始化配置
      this.initConf();
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
</style>
