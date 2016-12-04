import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  route: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TRANSITION_TO:
    return {
      ...state,
      route: action.route
    }

  default:
    return state
  }
}
