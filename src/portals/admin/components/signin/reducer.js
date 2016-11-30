import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'ready',
  token: null,
  error: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SETUP:
    return INITIAL_STATE

  case actionTypes.SIGNIN_REQUEST:
    return {
      ...state,
      status: 'submitting'
    }

  case actionTypes.SIGNIN_SUCCESS:
    return {
      ...state,
      token: action.data.token,
      status: 'success'
    }

  case actionTypes.SIGNIN_FAILURE:
    return {
      ...state,
      status: 'failure',
      error: action.error.message
    }

  default:
    return state
  }

}
