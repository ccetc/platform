import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  signin: {
    flash: null,
    status: 'ready',
    token: null
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SETUP:
    return {
      ...state,
      ...INITIAL_STATE
    }

  case actionTypes.SIGNIN_REQUEST:
    return {
      ...state,
      signin: {
        ...state.signin,
        flash: null,
        status: 'submitting'
      }
    }

  case actionTypes.SIGNIN_SUCCESS:
    return {
      ...state,
      signin: {
        ...state.signin,
        token: action.data.token,
        flash: null,
        status: 'success'
      }
    }

  case actionTypes.SIGNIN_FAILURE:
    return {
      ...state,
      signin: {
        ...state.signin,
        flash: {
          style: 'error',
          message: action.error.message
        },
        status: 'failure'
      }
    }

  default:
    return state
  }

}
