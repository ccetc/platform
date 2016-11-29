import * as actionTypes from './action_types'

const INITIAL_STATE = {
  reset: {
    flash: null,
    token: null,
    question: null,
    status: 'pending'
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET_TOKEN:
    return {
      ...state,
      reset: {
        token: action.token,
        status: 'initialized'
      }
    }

  case actionTypes.CLAIM_REQUEST:
  case actionTypes.SECURITY_REQUEST:
  case actionTypes.PASSWORD_REQUEST:
    return {
      ...state,
      reset: {
        ...state.reset,
        flash: null,
        status: 'submitting'
      }
    }

  case actionTypes.CLAIM_SUCCESS:
    return {
      ...state,
      reset: {
        ...state.reset,
        question: action.data.question,
        status: 'claimed'
      }
    }

  case actionTypes.SECURITY_SUCCESS:
    return {
      ...state,
      reset: {
        ...state.reset,
        status: 'verified'
      }
    }

  case actionTypes.PASSWORD_SUCCESS:
    return {
      ...state,
      reset: {
        ...state.reset,
        token: action.data.token,
        status: 'complete'
      }
    }

  case actionTypes.CLAIM_FAILURE:
  case actionTypes.SECURITY_FAILURE:
  case actionTypes.PASSWORD_FAILURE:
    return {
      ...state,
      reset: {
        ...state.reset,
        status: 'failed',
        flash: {
          style: 'failed',
          message: action.error.message
        }
      }
    }

  default:
    return state
  }

}
