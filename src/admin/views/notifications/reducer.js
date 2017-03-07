import * as actionTypes from './action_types'

export const INITIAL_STATE = {
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.MARK_READ_SUCCESS:
    return {
      ...state
    }

  default:
    return state
  }
}
