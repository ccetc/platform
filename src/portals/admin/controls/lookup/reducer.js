import * as actionTypes from './action_types'

const INITIAL_VALUE = {
  active: false,
  index: null,
  query: '',
  results: null,
  status: 'ready'
}

export default (state = INITIAL_VALUE, action) => {

  switch (action.type) {

  case actionTypes.BEGIN:
    return {
      ...state,
      active: true
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
      index: action.index
    }

  case actionTypes.LOOKUP_REQUEST:
    return {
      ...state,
      query: action.params.q
    }

  case actionTypes.LOOKUP_SUCCESS:
    return {
      ...state,
      results: (state.query.length) ? action.data.data : null
    }

  default:
    return state

  }

}
