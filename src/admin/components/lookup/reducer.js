import * as actionTypes from './action_types'

const INITIAL_VALUE = {
  active: false,
  chosen: null,
  selected: null,
  query: '',
  results: [],
  status: 'ready'
}

export default (state = INITIAL_VALUE, action) => {

  switch (action.type) {

  case actionTypes.BEGIN:
    return {
      ...state,
      active: true
    }

  case actionTypes.CLEAR:
    return {
      ...state,
      chosen: null,
      selected: null
    }

  case actionTypes.CANCEL:
    return {
      ...state,
      active: false
    }

  case actionTypes.CHOOSE:
    return {
      ...state,
      active: false,
      chosen: action.chosen,
      // chosen: state.results[action.index],
      selected: action.index
    }

  case actionTypes.TYPE:
    return {
      ...state,
      query: action.q
    }

  case actionTypes.LOOKUP_REQUEST:
    return {
      ...state,
      status: 'loading',
      query: action.params.q
    }

  case actionTypes.LOAD_SUCCESS:
    return {
      ...state,
      chosen: action.data[0]
    }

  case actionTypes.LOOKUP_SUCCESS:
    return {
      ...state,
      status: 'success',
      results: action.data
    }

  case actionTypes.LOOKUP_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state

  }

}
