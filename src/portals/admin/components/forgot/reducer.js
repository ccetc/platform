import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  forgot: {
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
        status: 'submitting'
      },
      session: {
        ...state.session,
        flash: null
      }
    }

  case actionTypes.RESET_SUCCESS:
    return {
      ...state,
      forgot: {
        status: 'success'
      },
      session: {
        ...state.session,
        flash: {
          style: 'info',
          message: 'Instructions for resetting your password have been emailed to you'
        }
      }
    }

  case actionTypes.RESET_FAILURE:
    return {
      ...state,
      forgot: {
        status: 'ready'
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
