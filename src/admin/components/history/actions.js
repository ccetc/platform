import * as actionTypes from './action_types'

export const push = (pathname) => ({
  type: actionTypes.PUSH,
  pathname
})

export const goBack = () => ({
  type: actionTypes.GO_BACK
})

export const reset = (pathname) => ({
  type: actionTypes.RESET,
  pathname
})
