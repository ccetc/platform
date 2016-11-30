import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  chrome: {
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
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TRANSITION_TO:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        navigation: {
          app: null,
          route: null
        },
        route: action.route
      }
    }

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        navigation: {
          ...state.chrome.navigation,
          app: (state.chrome.navigation.app === action.index) ? null : action.index
        }
      }
    }

  case actionTypes.ABORT_SEARCH:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        search: {
          ...state.chrome.search,
          query: '',
          results: null,
          active: false
        }
      }
    }

  case actionTypes.COMPLETE_SEARCH:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        search: {
          ...state.chrome.search,
          query: '',
          results: null,
          active: false,
          choice: state.chrome.search.results[action.model][action.index]
        }
      }
    }

  case actionTypes.LOOKUP_REQUEST:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        search: {
          ...state.chrome.search,
          query: action.params.q
        }
      }
    }

  case actionTypes.LOOKUP_SUCCESS:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        search: {
          ...state.chrome.search,
          results: (state.chrome.search.query.length) ? action.data : null
        }
      }
    }

  case actionTypes.OPEN_MODAL:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        modal: action.component
      }
    }

  case actionTypes.CLOSE_MODAL:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        modal: null
      }
    }

  case actionTypes.OPEN_DRAWER:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        drawer: {
          component: action.component,
          location: action.location
        }
      }
    }

  case actionTypes.CLOSE_DRAWER:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        drawer: null
      }
    }

  case actionTypes.OPEN_TASKS:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        tasks: action.tasks
      }
    }

  case actionTypes.CLOSE_TASKS:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        tasks: null
      }
    }

  default:
    return state
  }
}
