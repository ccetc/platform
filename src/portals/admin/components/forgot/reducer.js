import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  forgot: {
    flash: null,
    status: 'ready'
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SETUP:
    return {
      ...state,
      ...INITIAL_STATE
    }

  case actionTypes.RESET_REQUEST:
    return {
      ...state,
      forgot: {
        flash: null,
        status: 'submitting'
      }
    }

  case actionTypes.RESET_SUCCESS:
    return {
      ...state,
      forgot: {
        flash: {
          style: 'info',
          message: 'Instructions for resetting your password have been emailed to you'
        },
        status: 'ready'
      }
    }

  case actionTypes.RESET_FAILURE:
    return {
      ...state,
      forgot: {
        flash: {
          style: 'error',
          message: action.error.message
        },
        status: 'ready'
      }
    }

  default:
    return state
  }
}
