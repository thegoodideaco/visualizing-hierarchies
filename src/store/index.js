import Vue from 'vue'
import Vuex from 'vuex'

import words from 'lodash/words'

import controls from './modules/controls'
import Axios from 'axios'

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
    },
    getWikiThumbnail: ({}, url) => {


      return new Promise((resolve, reject) => {
        const title = url.slice(url.lastIndexOf('/')+1)

        const newUrl = 'https://en.wikipedia.org/w/api.php'

        const jsonp = require('jsonp')

        jsonp(newUrl, {
          param: `action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=200&callback`,
          name:  'callback'

        }, (err, data) => {
          if(err) {
            reject(err)
          }else{
            const [item] = Object.entries(data.query.pages)

            const {
              thumbnail
            } = item[1]

            if(thumbnail){
              resolve(item[1].thumbnail.source)

            }else{
              resolve('n/a')
            }


          }
        })
      })

      // const {data} = await Axios.post('https://en.wikipedia.org/w/api.php', {
      //   // params: {
      //   action:      'query',
      //   titles:      'Alain_Prost',
      //   prop:        'pageimages',
      //   format:      'json',
      //   pithumbsize: 200
      // },
      // {
      //   adapter: require('axios-jsonp')
      //   // callbackParamName: 'c'
      // })

      // return data
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
