import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  mode: 'apps',
  app: null,
  route: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET:
    return INITIAL_STATE

  case actionTypes.TOGGLE_MODE:
    return {
      ...state,
      mode: (state.mode === 'apps') ? 'teams' : 'apps'
    }

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      app: (state.app === action.index) ? null : action.index
    }

  default:
    return state
  }
}
