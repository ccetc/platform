import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SUBMIT_SUCCESS:
    return {
      ...state,
      status: 'success'
    }

  default:
    return state

  }

}
