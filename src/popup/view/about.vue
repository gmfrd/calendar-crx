<template>
  <div>
    <div class="page">
      <h3 class="title">关于</h3>
      <div class="list">
        <div class="item">
          <div class="title">节假日历</div>
          <div class="title">节假日历 <code>v1.0.0</code></div>
          <div class="title">介绍，提供最新中国节假日信息，支持农历日期显示。界面干净整洁，一目了然，随时了解日期安排</div>
          <h3>支持网站</h3>
          <div class="title">支持网址Github：<a href="https://github.com/gaoming13" target="_blank">https://github.com/gaoming13</a></div>
          <h3>反馈和帮助</h3>
          <div class="title">如果您有任何疑问，功能要求或报告BUG，请发邮件到wangersha2019@gmail.com。由于我们收到大量消息，因此我们不能保证所有消息都能得到答复。</div>
          <h3>捐赠</h3>
          <div>如果您喜欢本插件的话，希望您能慷慨捐赠，这会帮助开发工作并让我们改进服务</div>
        </div>
      </div>
      <div class="submit" @click="submit">Back to calendar</div>
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
        {id: 'cn', name: '中国大陆 / China'}, // 中国,汉语
        /*
        {id: 'us', name: 'United States / United States'}, // 美国,英语
        {id: 'jp', name: '日本 / Japan'}, // 日本,日本语
        {id: 'in', name: 'भारत / India'}, // 印度,印地语
        {id: 'br', name: 'Brasil / Brazil'}, // 巴西,葡萄牙语
        {id: 'de', name: 'Deutschland / Germany'}, // 德国,德语
        {id: 'ru', name: 'Россия / Russia'}, // 俄罗斯,俄语
        {id: 'gb', name: 'United Kingdom / United Kiongdom'}, // 英国,英语
        {id: 'ng', name: 'Nigeria / Nigeria'}, // 尼日利亚,英语
        {id: 'tr', name: 'Türkiye / Turkey'}, // 土耳其,土耳其语
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

<style lang="scss" scoped>
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
