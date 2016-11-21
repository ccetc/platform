import * as actionTypes from './action_types'

const INITIAL_STATE = {
  search: {
    query: '',
    active: false,
    results: [],
    choice: null
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.BEGIN_SEARCH:
    return {
      ...state,
      search: {
        ...state.search,
        active: true
      }
    }

  case actionTypes.ABORT_SEARCH:
    return {
      ...state,
      search: {
        ...state.search,
        active: false
      }
    }

  case actionTypes.COMPLETE_SEARCH:
    return {
      ...state,
      search: {
        ...state.search,
        query: '',
        active: false,
        results: [],
        choice: state.search.results[action.index]
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
        results: action.results
      }
    }

  default:
    return state
  }
}
