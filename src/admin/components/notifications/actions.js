import * as actionTypes from './action_types'

export const push = (title, body) => ({
  type: actionTypes.PUSH,
  title,
  body
})

export const clear = (index) => ({
  type: actionTypes.CLEAR,
  index
})
