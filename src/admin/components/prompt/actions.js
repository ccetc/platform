import * as actionTypes from './action_types'

export const open = (prompt) => ({
  type: actionTypes.OPEN,
  prompt
})

export const close = () => ({
  type: actionTypes.CLOSE
})
