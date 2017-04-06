import * as actionTypes from './action_types'

export const open = (tasks) => ({
  type: actionTypes.OPEN,
  tasks
})

export const close = () => ({
  type: actionTypes.CLOSE
})
