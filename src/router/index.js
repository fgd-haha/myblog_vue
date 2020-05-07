import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/components/Articles'
import Classification from '@/components/Classification'
import Tag from '@/components/Tag'
import Detail from '@/components/Detail'
import Me from '@/components/Me'
import Page_404 from '@/components/Page_404'
import axios from 'axios'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/myblog/',
      name: 'articles',
      component: Articles
    },
    {
      path: '/myblog/:articleid',
      name: 'article_detail',
      component: Detail
    },
    {
      path: '/myblog/classification/:classificationid',
      name: 'classification',
      component: Classification
    },
    {
      path: '/myblog/tag/:tagid',
      name: 'tag',
      component: Tag
    },
    {
      path: 'myblog/*',
      component: Page_404
    }
  ]
})
