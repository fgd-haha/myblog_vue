// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import 'vue-cookie/build/vue-cookie.js'
const VueCookie = require('vue-cookie');
Vue.use(VueCookie);

import VueMarkdown from 'vue-markdown'
Vue.component('vue-markdown', VueMarkdown);

import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);

import 'highlight.js/styles/googlecode.css'
import hljs from 'highlight.js'
Vue.directive('highlight', function (el, binding) {
  setTimeout(function () {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    });
  }, 1);
});

import 'lodash'
let _ = require('lodash');


new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
});

