import * as actionTypes from './action_types'

export function enable() {
  return {
    type: actionTypes.ENABLE
  }
}

export function pushNotification(message) {
  return {
    type: actionTypes.PUSH_NOTIFICATION,
    message
  }
}

export function clearNotification() {
  return {
    type: actionTypes.CLEAR_NOTIFICATION
  }
}
