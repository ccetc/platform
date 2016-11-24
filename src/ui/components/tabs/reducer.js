import * as actionTypes from './action_types'

const INITIAL_STATE = {
  tabs: {
    active: 0
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.CHANGE_TAB:
    return {
      ...state,
      tabs: {
        active: action.index
      }
    }

  default:
    return state

  }

}