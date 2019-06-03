import Vue from 'vue'
import App from './App.vue'

import '@/assets/scss/style.scss'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import Axios from 'axios'

Vue.use(VueAxios, Axios)

const g = []
g.fl

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if(process.env.NODE_ENV === 'development') {
  Object.assign(window, {
    d3: require('d3'),
    _:  require('lodash')
  })
}
