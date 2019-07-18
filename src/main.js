import Vue from 'vue'
import App from './App.vue'

import '@/assets/scss/style.scss'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import Axios from 'axios'

import './utils/webFonts'


/**
 * Providing utils for dev only
 *
 */
if(process.env.NODE_ENV === 'development') {


  /**
   * ^ Assigning to dev object so they are not global
   */
  Object.assign(window, {
    dev: {
      d3:         require('d3'),
      _:          require('lodash'),
      SuffixTree: require('./utils/suffix-tree').default,
      store,
      Vue
    }
  })

  Vue.component('OpenButton', () => import('@/utils/OpenButton.vue'))


  /**
   * ^ Provide a global method to open a component in the editor
   */
  Vue.mixin({
    methods: {
      openInEditor(component = this) {
        Axios.get('__open-in-editor', {
          params: {
            file: component.$options.__file
          }
        })
      }
    }
  })
}



Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


