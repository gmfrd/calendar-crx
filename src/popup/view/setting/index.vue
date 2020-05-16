<template>
  <div>
    <div class="page">
      <div class="nav">
        <div class="g-arrow back"><i /></div>
        <div class="title">设置</div>
      </div>
      <div class="list">
        <div class="item">
          <div class="g-select-group">
            <div class="label">节假日地区</div>
            <div class="g-select select">
              <div class="label">{{ getRegionLabel(region) }}</div>
              <div class="arrow" />
              <select v-model="region">
                <option v-for="v in enumRegion" :key="v.id" :value="v.id">{{ v.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="g-select-group">
            <div class="label">一周开始于</div>
            <div class="g-select select">
              <div class="label">{{ getFirstDayOfWeekLabel(firstDayOfWeek) }}</div>
              <div class="arrow" />
              <select v-model="firstDayOfWeek">
                <option v-for="v in enumFirstDayOfWeek" :key="v.id" :value="v.id">{{ v.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="g-button1" @click="submit">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as storage from '../../../lib/storage';

export default {
  data: () => {
    return {
      // 地区
      region: '',
      // 每周开始于
      firstDayOfWeek: 0,
      // 地区枚举
      enumRegion: [
        {id: 'cn', name: '中国 / China'}, // 中国,简体
        {id: 'tw', name: '台灣 / Taiwan'}, // 台湾,繁体
        {id: 'hk', name: '香港 / Hongkong'}, // 香港,繁体
        {id: 'mo', name: '澳门 / Macao'}, // 澳门,繁体
        {id: 'jp', name: '日本 / Japan'}, // 日本,日本语
        {id: 'us', name: 'United States / United States'}, // 美国,英语
        // {id: 'in', name: 'भारत / India'}, // 印度,印地语
        // {id: 'br', name: 'Brasil / Brazil'}, // 巴西,葡萄牙语
        // {id: 'de', name: 'Deutschland / Germany'}, // 德国,德语
        // {id: 'ru', name: 'Россия / Russia'}, // 俄罗斯,俄语
        // {id: 'gb', name: 'United Kingdom / United Kiongdom'}, // 英国,英语
        // {id: 'tr', name: 'Türkiye / Turkey'}, // 土耳其,土耳其语
        // 奥地利
        // 丹麦
        // 荷兰
        // 芬兰
        // 比利时
        // 瑞典
        // 法国
      ],
      // 星期枚举
      enumFirstDayOfWeek: [
        {id: '0', name: '周日'},
        {id: '1', name: '周一'},
        {id: '2', name: '周二'},
        {id: '3', name: '周三'},
        {id: '4', name: '周四'},
        {id: '5', name: '周五'},
        {id: '6', name: '周六'},
      ],
    };
  },
  created() {
    // 地区
    const region = storage.getItem('setting.region');
    this.region = region !== false ? region.data : 'cn';
    // 每周开始于
    const firstDayOfWeek = storage.getItem('setting.firstDayOfWeek');
    this.firstDayOfWeek = (firstDayOfWeek !== false ? firstDayOfWeek.data : 0).toString();
  },
  methods: {
    // 获取地区名称
    getRegionLabel(id) {
      const arr = this.enumRegion.filter((v) => v.id === id);
      return arr.length ? arr[0].name : '';
    },
    // 获取星期名称
    getFirstDayOfWeekLabel(id) {
      const arr = this.enumFirstDayOfWeek.filter((v) => v.id === id);
      return arr.length ? arr[0].name : '';
    },
    // 提交信息
    submit() {
      // 地区
      storage.setItem('setting.region', this.region);
      // 每周开始于
      storage.setItem('setting.firstDayOfWeek', this.firstDayOfWeek);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 450px;
  color: #212529;
  & > .nav {
    display: flex;
    align-items: center;
    height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 1px solid rgb(204, 214, 221);
    & > .title {
      font-size: 18px;
      margin-left: 10px;
      font-weight: bold;
    }
  }
  & > .list {
    padding: 10px;
    & > .item {
      margin-bottom: 20px;
      & .select {
        text-align: left;
      }
    }
  }
  & > .bottom {
    display: flex;
    & > .g-button1 {
      margin-left: auto;
    }
  }
}
</style>
