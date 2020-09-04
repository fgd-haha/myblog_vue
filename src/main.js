// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// elementui组件使用
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

// cookie处理
import VueCookies from 'vue-cookies'
import 'vue-cookie/build/vue-cookie.js'

Vue.use(VueCookies);
Vue.use(require('vue-cookie'));
Vue.use(require('vue-cookies'));

// markdown组件使用
import VueMarkdown from 'vue-markdown'

Vue.component('vue-markdown', VueMarkdown);

// markdown高亮处理
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

// 引用全局变量组件
import global_ from './components/util/Global'

Vue.prototype.GLOBAL = global_;

// qs是一个增加了一些安全性的查询字符串解析和序列化字符串
import qs from 'qs'

Vue.prototype.qs = qs;

// 实例解析防抖动
import 'lodash'

let _ = require('lodash');

// 使用一些elementui没有的svg
import Icon from 'vue-svg-icon/Icon.vue'

Vue.component('vue-svg-icon', Icon);

// 阻止启动生产消息
Vue.config.productionTip = false;


new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>',
    render: h => h(App)
});

