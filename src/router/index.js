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
      path: '/',
      name: 'articles',
      component: Articles
    },
    {
      path: '/:articleid',
      name: 'detail',
      component: Detail
    },
    {
      path: '/classification/:classificationid',
      name: 'classificationid',
      component: Classification
    },
    {
      path: '/tag/:tagid',
      name: 'tagid',
      component: Tag
    },
    {
      path: '*',
      component: Page_404
    }
  ]
})
