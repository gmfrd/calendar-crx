import Vue from 'vue';
import './scss/common.scss';
import App from './App.vue';
import crx from '../lib/crx';
import * as calendar from '../lib/calendar';

Vue.prototype.$crx = crx;

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  components: {App},
  render: (h) => h('App'),
}).$mount(root);

// 今天日期
const today = calendar.getToday();
chrome.action.setIcon({
  path: {'32': '../icon/cal_' + today.d + '.png'},
});
