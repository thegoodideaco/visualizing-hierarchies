import Vue from 'vue'
import Router from 'vue-router'

import routes from './main.routes'

import d3Route from './d3'
import vueRoute from './vue'
import vued3Route from './vue+d3'

import theoryRoute from './visual-theory'
import { EdgeBundling } from '@/components/demos/asyncDemos'

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
      path: '/xp',
      name: 'Experiments',
      meta: {
        title: 'Experiments'
      },
      component: () => import('../layouts/ExperimentLayout.vue'),
      children:  [
        {
          path:       '/xp/edgebundling',
          components: {
            default:  EdgeBundling,
            controls: () => import('@/components/demos/enron-emails/Controls.vue')
          },
          meta: {
            title: 'Edge Bundling'
          }
        },
        {
          path:       '/xp/f1',
          components: {
            default:  () => import('@/components/experiments/FormulaOne'),
            controls: () => import('@/components/demos/enron-emails/Controls.vue')
          },
          meta: {
            title: 'Formula One'
          }
        }
      ]
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
