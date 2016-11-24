import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  main: {
    showTasks: false,
    task: null
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TOGGLE_TASKS:
    return {
      ...state,
      main: {
        showTasks: !state.main.showTasks,
        task: null
      }
    }

  case actionTypes.CHOOSE_TASK:
    return {
      ...state,
      main: {
        showTasks: false,
        task: action.index
      }
    }

  default:
    return state
  }

}
