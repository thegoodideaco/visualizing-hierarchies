import Vue from 'vue'
import Router from 'vue-router'

import routes from './main.routes'

import d3Route from './d3'
import vueRoute from './vue'
import vued3Route from './vue+d3'

import theoryRoute from './visual-theory'

Vue.use(Router)


export default new Router({
  routes: [
    ...routes,
    theoryRoute,
    vueRoute,
    d3Route,
    vued3Route,
    {
      path: '/outro',
      name: 'Outro',
      meta: {
        title: 'Outro'
      },
      component: () => import('../views/intro.vue')
    },
    {
      path: '/resources',
      name: 'Resources',
      meta: {
        title: 'Resources'
      },
      component: () => import('../views/intro.vue')
    },
    {
      path:     '/404',
      redirect: '/'
    },
    {
      path:     '*',
      redirect: '/'
    }
  ]
})
