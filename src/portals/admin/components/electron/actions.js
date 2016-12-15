import * as actionTypes from './action_types'

export function pushNotification(title, body, icon) {
  return {
    type: actionTypes.PUSH_NOTIFICATION,
    title,
    body,
    icon
  }
}

export function clearNotification() {
  return {
    type: actionTypes.CLEAR_NOTIFICATION
  }
}
