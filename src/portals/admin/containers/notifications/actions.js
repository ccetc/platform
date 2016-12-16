import * as actionTypes from './action_types'

export function push(title, body) {
  return {
    type: actionTypes.PUSH,
    title,
    body
  }
}

export function clearNotification(index) {
  return {
    type: actionTypes.CLEAR,
    index
  }
}
