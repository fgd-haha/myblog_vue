// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-cookie/build/vue-cookie.js'
import VueMarkdown from 'vue-markdown'


Vue.use(ElementUI);
Vue.config.productionTip = false;

var VueCookie = require('vue-cookie');


// Tell Vue to use the plugin
Vue.component('vue-markdown', VueMarkdown);
Vue.use(VueMarkdown);
Vue.use(VueCookie);
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
});

