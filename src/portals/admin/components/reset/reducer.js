import * as actionTypes from './action_types'

const INITIAL_STATE = {
  token: null,
  question: null,
  status: 'pending',
  error: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET_TOKEN:
    return {
      ...state,
      token: action.token,
      status: 'initialized'
    }

  case actionTypes.CLAIM_REQUEST:
  case actionTypes.SECURITY_REQUEST:
  case actionTypes.PASSWORD_REQUEST:
    return {
      ...state,
      status: 'submitting'
    }

  case actionTypes.CLAIM_SUCCESS:
    return {
      ...state,
      question: action.data.question,
      status: 'claimed'
    }

  case actionTypes.SECURITY_SUCCESS:
    return {
      ...state,
      status: 'verified'
    }

  case actionTypes.PASSWORD_SUCCESS:
    return {
      ...state,
      token: action.data.token,
      status: 'complete'
    }

  case actionTypes.CLAIM_FAILURE:
  case actionTypes.SECURITY_FAILURE:
  case actionTypes.PASSWORD_FAILURE:
    return {
      ...state,
      status: 'failure',
      error: action.error.message
    }

  default:
    return state
  }

}
