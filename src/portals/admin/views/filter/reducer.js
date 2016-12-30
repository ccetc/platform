import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  active: null,
  query: {}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET:
    return {
      ...state,
      query: {}
    }

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

  case actionTypes.UPDATE:
    return {
      ...state,
      query: {
        ...state.query,
        [action.key]: action.value
      }
    }

  default:
    return state
  }
}
