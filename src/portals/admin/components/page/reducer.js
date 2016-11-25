import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  tasks: {
    show: false,
    task: null
  },
  modal: false
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TOGGLE_TASKS:
    return {
      ...state,
      tasks: {
        show: !state.tasks.show,
        task: null
      }
    }

  case actionTypes.CHOOSE_TASK:
    return {
      ...state,
      tasks: {
        show: false,
        task: action.index
      }
    }

  case actionTypes.OPEN_MODAL:
    return {
      ...state,
      modal: true
    }

  case actionTypes.CLOSE_MODAL:
    return {
      ...state,
      modal: false
    }

  default:
    return state
  }

}
