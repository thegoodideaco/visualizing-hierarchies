import * as mutations from './mutations'

/** @type {import("vuex").Module<any, any>} */
const module = {
  state: () => ({
    edgeBundling: {
      angle: 270
    }
  }),
  mutations,
  namespaced: true
}

export default module
