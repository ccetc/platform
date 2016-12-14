import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  enabled: false,
  notification: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.ENABLE:
    return {
      ...state,
      enabled: true
    }

  case actionTypes.PUSH_NOTIFICATION:
    return {
      ...state,
      notification: {
        title: action.title,
        body: action.body,
        icon: action.icon
      }
    }

  case actionTypes.CLEAR_NOTIFICATION:
    return {
      ...state,
      notification: null
    }

  default:
    return state
  }

}
