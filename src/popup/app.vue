<template>
  <div class="app">
    <template v-if="calIsShow">
      <!-- 中国大陆 -->
      <CalCn v-if="region === 'cn'" :first-day-of-week="firstDayOfWeek" />
    </template>
    <!-- 设置页面 -->
    <Setting v-if="settingIsShow" @close="settingClose" />
    <!-- 关于页面 -->
    <About v-if="aboutIsShow" @close="aboutClose" />
    <!-- 设置按钮 -->
    <PartMenu @toSetting="settingIsShow = true; calIsShow = false;" @toAbout="aboutIsShow = true; calIsShow = false;" />
  </div>
</template>

<script>
import * as storage from '../lib/storage';
import CalCn from './view/cn/index.vue';
import Setting from './view/setting.vue';
import About from './view/about.vue';
import PartMenu from './view/_menu.vue';

export default {
  components: {
    CalCn,
    Setting,
    About,
    PartMenu,
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
    // 配置页面关闭
    settingClose() {
      // 初始化配置
      this.initSetting();
      this.settingIsShow = false;
      this.calIsShow = true;
    },
    // 关于页面关闭
    aboutClose() {
      this.aboutIsShow = false;
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
