import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  signin: {
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
        status: 'submitting'
      }
    }

  case actionTypes.SIGNIN_SUCCESS:
    return {
      ...state,
      signin: {
        ...state.signin,
        token: action.data.token,
        status: 'success'
      }
    }

  case actionTypes.SIGNIN_FAILURE:
    return {
      ...state,
      signin: {
        ...state.signin,
        status: 'failure'
      },
      session: {
        ...state.session,
        flash: {
          style: 'info',
          message: action.error.message
        }
      }
    }

  default:
    return state
  }

}
