import Vue from 'vue'
import App from './App.vue'

import '@/assets/scss/style.scss'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import Axios from 'axios'
import VueResize from 'vue-resize'
import 'vue-resize/dist/vue-resize.css'

import './utils/webFonts'

// ! Available in production as well...
Vue.component('OpenButton', () => import('@/utils/OpenButton.vue'))

/**
 * .########..########.##.....##.....#######..##....##.##.......##....##
 * .##.....##.##.......##.....##....##.....##.###...##.##........##..##.
 * .##.....##.##.......##.....##....##.....##.####..##.##.........####..
 * .##.....##.######...##.....##....##.....##.##.##.##.##..........##...
 * .##.....##.##........##...##.....##.....##.##..####.##..........##...
 * .##.....##.##.........##.##......##.....##.##...###.##..........##...
 * .########..########....###........#######..##....##.########....##...
 */
if (process.env.NODE_ENV === 'development') {
  /**
   * ^ Assigning to dev object so they are not global
   */
  Object.assign(window, {
    dev: {
      d3:          require('d3'),
      _:           require('lodash'),
      SuffixTree:  require('./utils/suffix-tree').default,
      html2canvas: require('html2canvas'),
      store,
      Vue
    }
  })

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

Vue.use(VueResize)

Vue.use(VueAxios, Axios)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
