import * as actionTypes from './action_types'

const INITIAL_STATE = {
  signin: {
    status: 'ready'
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SIGNIN_REQUEST:
    return {
      ...state,
      signin: {
        status: 'submitting'
      },
      flash: null
    }

  case actionTypes.SIGNIN_SUCCESS:
    return {
      ...state,
      signin: {
        status: 'ready'
      },
      ...action.session
    }

  case actionTypes.SIGNIN_FAILURE:
    return {
      ...state,
      flash: {
        style: 'error',
        message: action.error.message
      },
      signin: {
        status: 'ready'
      }
    }

  default:
    return state
  }
}
