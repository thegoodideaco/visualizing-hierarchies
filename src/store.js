import Vue from 'vue'
import Vuex from 'vuex'

import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    readme: null
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
      return _.words(state.readme.toLowerCase()).reduce((prev, cur) => {
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
  }
})
