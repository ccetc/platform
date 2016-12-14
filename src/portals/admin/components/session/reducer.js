import * as actionTypes from './action_types'

const INITIAL_STATE = {
  apps: null,
  status: 'pending',
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_SUCCESS:
    return {
      ...state,
      status: 'active',
      apps: action.data.apps,
      user: action.data.user
    }

  case actionTypes.LOAD_FAILURE:
    return {
      ...state,
      status: 'failure',
      error: action.error
    }

  default:
    return state
  }

}
