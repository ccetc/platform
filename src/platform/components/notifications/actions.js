import * as actionTypes from './action_types'
import Api from '../../../utils/api'

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
