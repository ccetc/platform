import * as actionTypes from './action_types'

const INITIAL_STATE = {
  token: null,
  presence: {
    status: 'pending'
  },
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.token
    }

  case actionTypes.LOAD_TOKEN_FAILURE:
    return {
      ...state,
      presence: {
        status: 'initialized'
      }
    }

  case actionTypes.SIGNIN_SUCCESS:
    return {
      ...state,
      presence: {
        status: 'initialized'
      },
      ...action.session
    }


  default:
    return state
  }
}
