import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  tasks: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.OPEN_TASKS:
    return {
      ...state,
      tasks: action.tasks
    }

  case actionTypes.CLOSE_TASKS:
    return {
      ...state,
      tasks: null
    }

  default:
    return state
  }
}
