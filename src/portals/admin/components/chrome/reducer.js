import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  drawer: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TRANSITION_TO:
    return {
      ...state,
      route: action.route
    }

  case actionTypes.OPEN_DRAWER:
    return {
      ...state,
      drawer: {
        component: action.component,
        location: action.location
      }
    }

  case actionTypes.CLOSE_DRAWER:
    return {
      ...state,
      drawer: null
    }

  default:
    return state
  }
}
