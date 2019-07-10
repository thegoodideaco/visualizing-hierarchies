import Vue from 'vue'
import Vuex from 'vuex'

import words from 'lodash/words'

import controls from './modules/controls'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    readme: null,
    emails: []
  },
  modules: {
    controls
  },
  mutations: {
    setReadme(state, text) {
      state.readme = text
    }
  },
  actions: {
    setReadme: ({commit}, text) => {
      commit('setReadme', text)
    }
  },
  getters: {

    /**
     * Word Frequency in active readme
     * @returns {{word: string, value: number}}
     * @param {*} state
     */
    wordScores(state) {
      if(!state.readme) return []
      return words(state.readme.toLowerCase()).reduce((prev, cur) => {
        const match = prev.find(v => v.word === cur)

        if(match) {
          match.value ++
        }else{
          prev.push({
            word:  cur,
            value: 1
          })
        }

        return prev
      }, []).sort((a, b) => b.value - a.value)
    }
  },
  strict: process.env.NODE_ENV === 'development'

})
