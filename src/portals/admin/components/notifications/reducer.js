import * as actionTypes from './action_types'
import _ from 'lodash'

export const INITIAL_STATE = {
  queue: [],
  unread: 0
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.PUSH_NOTIFICATION:
    return {
      ...state,
      queue: [...state.notifications.queue, action.notification]
    }

  case actionTypes.READ_NOTIFICATION:
    return {
      ...state,
      queue: _.reject(state.notifications.queue, { id: action.id })
    }

  default:
    return state
  }
}
