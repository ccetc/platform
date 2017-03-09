import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'pending',
  results: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_REQUEST:
    return {
      ...state,
      status: 'loading'
    }

  case actionTypes.LOAD_SUCCESS:
    return {
      ...state,
      status: 'success',
      results: action.data
    }

  case actionTypes.TOGGLE_SUCCESS:
    return {
      ...state
    }

  default:
    return state

  }

}
