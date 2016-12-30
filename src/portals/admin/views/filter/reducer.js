import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  active: null,
  query: {
    user_id: {
      $in: [1,2]
    },
    project_id: {
      $in: [5,8]
    }
  }
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

  default:
    return state
  }
}
