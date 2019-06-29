import Vue from 'vue'
import Router from 'vue-router'

import routes from './main.routes'

import d3Route from './d3'
import vueRoute from './vue'

Vue.use(Router)

export default new Router({
  routes: [
    ...routes,
    vueRoute,
    d3Route,
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
