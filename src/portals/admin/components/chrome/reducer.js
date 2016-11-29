import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  chrome: {
    drawer: {
      expanded: false,
      app: null,
      route: null
    },
    search: {
      query: '',
      active: false,
      results: [],
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
        drawer: {
          expanded: false,
          app: null,
          route: null
        },
        route: action.route
      }
    }

  case actionTypes.TOGGLE_DRAWER:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        drawer: {
          expanded: !state.chrome.drawer.expanded,
          app: null,
          route: null
        }
      }
    }

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        drawer: {
          ...state.chrome.drawer,
          app: (state.chrome.drawer.app === action.index) ? null : action.index
        }
      }
    }

  case actionTypes.BEGIN_SEARCH:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        search: {
          ...state.chrome.search,
          active: true
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
          active: false,
          results: [],
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
          results: (state.chrome.search.query.length) ? action.data : []
        }
      }
    }

  default:
    return state
  }
}
