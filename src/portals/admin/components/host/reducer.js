import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  style: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET:
    return {
      style: action.style
    }

  default:
    return state
  }
}
