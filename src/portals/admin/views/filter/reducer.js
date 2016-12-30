import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  active: null,
  filters: {}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET:
    return INITIAL_STATE

  case actionTypes.CHOOSE:
    return {
      ...state,
      active: action.index
    }

  case actionTypes.BACK:
    return {
      ...state,
      active: null
    }

  default:
    return state
  }
}
