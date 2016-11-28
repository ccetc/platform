import * as actionTypes from './action_types'

const INITIAL_STATE = {
  session: {
    apps: null,
    token: null,
    status: 'pending',
    user: null
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_TOKEN_SUCCESS:
    return {
      ...state,
      session: {
        ...state.session,
        status: 'initialized',
        token: action.value
      }
    }

  case actionTypes.LOAD_TOKEN_FAILURE:
    return {
      ...state,
      session: {
        ...state.session,
        status: 'initialized'
      }
    }

  case actionTypes.SAVE_TOKEN_SUCCESS:
    return {
      ...state,
      session: {
        ...state.session,
        status: 'active',
        token: action.value
      }
    }

  case actionTypes.SIGNIN_SUCCESS:
    return {
      ...state,
      session: {
        ...state.session,
        status: 'active',
        token: action.data.token
      }
    }

  case actionTypes.SIGNIN_FAILURE:
    return {
      ...state,
      session: {
        ...state.session,
        status: 'failed',
        token: null
      }
    }

  case actionTypes.LOAD_SESSION_SUCCESS:
    return {
      ...state,
      session: {
        ...state.session,
        status: 'active',
        apps: action.data.apps,
        user: action.data.user
      }
    }

  case actionTypes.SIGNOUT_SUCCESS:
    return {
      ...state,
      session: {
        apps: null,
        token: null,
        status: 'initialized',
        user: null
      }
    }

  default:
    return state
  }

}
