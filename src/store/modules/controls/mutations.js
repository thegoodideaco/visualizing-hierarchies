import set from 'lodash/set'

/** @type {Mutation} */
export const update = (state, { path, value }) => {
  set(state, path, value)
}
