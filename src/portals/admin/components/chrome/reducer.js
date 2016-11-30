import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  navigation: {
    app: null,
    route: null
  },
  tasks: null,
  drawer: null,
  modal: null,
  search: {
    query: '',
    active: false,
    results: null,
    choice: null
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TRANSITION_TO:
    return {
      ...state,
      navigation: {
        app: null,
        route: null
      },
      route: action.route
    }

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      navigation: {
        ...state.navigation,
        app: (state.navigation.app === action.index) ? null : action.index
      }
    }

  case actionTypes.ABORT_SEARCH:
    return {
      ...state,
      search: {
        ...state.search,
        query: '',
        results: null,
        active: false
      }
    }

  case actionTypes.COMPLETE_SEARCH:
    return {
      ...state,
      search: {
        ...state.search,
        query: '',
        results: null,
        active: false,
        choice: state.search.results[action.model][action.index]
      }
    }

  case actionTypes.LOOKUP_REQUEST:
    return {
      ...state,
      search: {
        ...state.search,
        query: action.params.q
      }
    }

  case actionTypes.LOOKUP_SUCCESS:
    return {
      ...state,
      search: {
        ...state.search,
        results: (state.search.query.length) ? action.data : null
      }
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
