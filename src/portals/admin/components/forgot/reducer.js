import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'ready',
  error: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SETUP:
    return INITIAL_STATE

  case actionTypes.RESET_REQUEST:
    return {
      status: 'submitting',
      error: null
    }

  case actionTypes.RESET_SUCCESS:
    return {
      status: 'success',
      error: null
    }

  case actionTypes.RESET_FAILURE:
    return {
      status: 'failure',
      error: action.error.message
    }

  default:
    return state
  }
}
