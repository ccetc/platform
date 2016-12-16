import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  app: null,
  route: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET:
    return INITIAL_STATE

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      app: (state.app === action.index) ? null : action.index
    }

  default:
    return state
  }
}
