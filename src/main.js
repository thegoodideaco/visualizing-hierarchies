import Vue from 'vue'
import App from './App.vue'

import '@/assets/scss/style.scss'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import Axios from 'axios'

import './utils/webFonts'



Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


/**
 * Providing some helper libs for dev only
 * ^ Assigning to dev object so they are not global
 */
if(process.env.NODE_ENV === 'development') {
  Object.assign(window, {
    dev: {
      d3:         require('d3'),
      _:          require('lodash'),
      SuffixTree: require('./utils/suffix-tree').default,
      store
    }
  })
}