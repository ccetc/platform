import * as actionTypes from './action_types'

export function toggleDrawer() {
  return {
    type: actionTypes.TOGGLE_DRAWER
  }
}

export function changeApp(index) {
  return {
    type: actionTypes.CHANGE_APP,
    index
  }
}

export function pushNotification(notification) {
  return {
    type: actionTypes.PUSH_NOTIFICATION, notification
  }
}

export function readNotification(id) {
  return {
    type: actionTypes.READ_NOTIFICATION,
    id
  }
}
