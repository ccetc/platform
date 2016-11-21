import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  flash: {
    style: null,
    message: null
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET:
    return {
      ...state,
      flash: {
        style: action.style,
        message: action.message
      }
    }

  case actionTypes.CLEAR:
    return {
      ...state,
      flash: {
        style: null,
        message: null
      }
    }

  default:
    return state
  }
}
