// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-cookie/build/vue-cookie.js'
import VueCookies from 'vue-cookies'
import VueMarkdown from 'vue-markdown'
import Icon from 'vue-svg-icon/Icon.vue';
import 'highlight.js/styles/googlecode.css'
import hljs from 'highlight.js'
import 'lodash'
import global_ from './components/util/Global'

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(require('vue-cookie'));

Vue.use(VueCookies);
Vue.use(require('vue-cookies'));

Vue.prototype.GLOBAL = global_;

Vue.component('vue-markdown', VueMarkdown);

Vue.component('icon', Icon);

Vue.directive('highlight', function (el, binding) {
  setTimeout(function () {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    });
  }, 1);
});

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

