import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  notification: null,
  preferences: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET_PREFERENCE:
    return {
      ...state,
      preferences: {
        ...state.preferences,
        [action.key]: action.value
      }
    }

  case actionTypes.LOAD_PREFERENCES_FAILURE:
  case actionTypes.SAVE_PREFERENCES_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  case actionTypes.LOAD_PREFERENCES_SUCCESS:
  case actionTypes.SAVE_PREFERENCES_SUCCESS:
    return {
      ...state,
      preferences: action.value ? action.value : {},
      status: 'success'
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
