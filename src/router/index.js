import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/components/main/Articles'
import Detail from '@/components/main/ArticleDetail'
import Page_404 from '@/components/util/Page_404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      redirect: {name: 'articles'}
    },
    {
      path: '/myblog/',
      query: { classificationid: null, tagid: null },
      name: 'articles',
      component: Articles
    },
    {
      path: '/myblog/:articleid',
      name: 'article_detail',
      component: Detail
    },
    {
      path: 'myblog/*',
      component: Page_404
    }
  ]
})
