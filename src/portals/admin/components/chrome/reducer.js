import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  drawer: null,
  modal: null,
  tasks: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TRANSITION_TO:
    return {
      ...state,
      route: action.route
    }

  case actionTypes.OPEN_MODAL:
    return {
      ...state,
      modal: action.component
    }

  case actionTypes.CLOSE_MODAL:
    return {
      ...state,
      modal: null
    }

  case actionTypes.OPEN_DRAWER:
    return {
      ...state,
      drawer: {
        component: action.component,
        location: action.location
      }
    }

  case actionTypes.CLOSE_DRAWER:
    return {
      ...state,
      drawer: null
    }

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
