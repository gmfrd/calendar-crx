import Vue from 'vue';
import './scss/common.scss';
import App from './App.vue';

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  components: {App},
  render: (h) => h('App'),
}).$mount(root);
