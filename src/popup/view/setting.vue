<template>
  <div>
    <div class="page">
      <h3 class="title">设置</h3>
      <div class="list">
        <div class="item">
          <div class="title">地区</div>
          <select v-model="region" class="select">
            <option v-for="v in enumRegion" :key="v.id" :value="v.id">{{ v.name }}</option>
          </select>
        </div>
        <div class="item">
          <div class="title">一周开始于</div>
          <select v-model="firstDayOfWeek" class="select">
            <option v-for="v in enumFirstDayOfWeek" :key="v.id" :value="v.id">{{ v.name }}</option>
          </select>
        </div>
      </div>
      <div class="submit" @click="submit">确认</div>
    </div>
  </div>
</template>

<script>
import * as storage from '../../lib/storage';

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
        /*
        - {id: 'cn', name: '中国大陆 / China'}, // 中国,汉语
        - {id: 'us', name: 'United States / United States'}, // 美国,英语
        - {id: 'jp', name: '日本 / Japan'}, // 日本,日本语
        - {id: 'in', name: 'भारत / India'}, // 印度,印地语
        - {id: 'br', name: 'Brasil / Brazil'}, // 巴西,葡萄牙语
        - {id: 'de', name: 'Deutschland / Germany'}, // 德国,德语
        - {id: 'ru', name: 'Россия / Russia'}, // 俄罗斯,俄语
        - {id: 'gb', name: 'United Kingdom / United Kiongdom'}, // 英国,英语
        - {id: 'tr', name: 'Türkiye / Turkey'}, // 土耳其,土耳其语
        // 奥地利
        // 丹麦
        // 英国
        // 荷兰
        // 芬兰
        // 比利时
        // 瑞典
        // 法国
        // 香港
        // 台湾
        */
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

<style lang="scss">
.page {
  width: 300px;
  padding: 10px;
  color: #212529;
  & > .title {
    font-size: 20px;
    margin-bottom: 10px;
  }
  & > .list {
    & > .item {
      margin-bottom: 15px;
      & > .title {
        font-size: 14px;
        margin-bottom: 6px;
      }
      & > .select {
        display: block;
        width: 100%;
        color: #495057;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #ced4da;
        border: 1px solid #999;
        border-bottom-color: #d8d8d8;
        border-right-color: #d8d8d8;
        cursor: pointer;
        text-align: center;
        padding: 2px 10px;
        color: #3c4043;
        background-color: transparent;
        transition: background-color 100ms linear;
        &:hover {
          box-shadow: inset 1px 1px 0 0 #d8d8d8;
        }
        &:focus {
          background-color: #e8eaed;
        }
        &:focus:hover {
          background-color: #dadce0;
        }
      }
    }
  }
  & > .submit {
    margin-top: 30px;
    font-size: 16px;
    line-height: 20px;
    padding: 8px 16px;
    border: 0;
    color: #fff;
    background-color: #37bc9b;
    border-color: #37bc9b;
    cursor: pointer;
    text-align: center;
    margin-bottom: 10px;
    transition: background-color 100ms linear;
    &:hover {
      background-color: #3aa289;
      border-color: #3aa289;
    }
  }
}
</style>
