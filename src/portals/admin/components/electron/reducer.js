import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  enabled: false
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.ENABLE:
    return {
      ...state,
      enabled: true
    }

  default:
    return state
  }

}