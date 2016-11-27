import * as actionTypes from './action_types'
import _ from 'lodash'

export const INITIAL_STATE = {
  notifications: {
    queue: [],
    unread: 0
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.PUSH_NOTIFICATION:
    return {
      ...state,
      notifications: {
        ...state.notifications,
        queue: [...state.notifications.queue, action.notification]
      }
    }

  case actionTypes.READ_NOTIFICATION:
    return {
      ...state,
      notifications: {
        ...state.notifications,
        queue: _.reject(state.notifications.queue, { id: action.id })
      }
    }

  default:
    return state
  }
}
