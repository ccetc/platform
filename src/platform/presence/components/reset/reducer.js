import * as actionTypes from './action_types'

const INITIAL_STATE = {
  reset: {
    status: 'ready'
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET_REQUEST:
    return {
      ...state,
      session: {
        status: 'submitting'
      },
      flash: null
    }

  case actionTypes.RESET_SUCCESS:
    return {
      ...state,
      flash: {
        style: 'success',
        message: 'Instructions for resetting your password have been emailed to you'
      },
      session: {
        status: 'ready'
      }
    }

  case actionTypes.RESET_FAILURE:
    return {
      ...state,
      flash: {
        style: 'error',
        message: action.error.message
      },
      session: {
        status: 'ready'
      }
    }

  default:
    return state
  }
}
