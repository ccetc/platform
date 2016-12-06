import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'pending',
  records: [],
  loaded: 0,
  total: 0
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET:
    return INITIAL_STATE

  case actionTypes.FETCH_REQUEST:
    return {
      ...state,
      records: (action.params['$skip'] > 0) ? state.records : [],
      status: 'loading'
    }

  case actionTypes.FETCH_SUCCESS:
    const loaded = state.records.length + action.data.data.length
    return {
      ...state,
      records: [
        ...state.records,
        ...action.data.data
      ],
      loaded,
      total: action.data.total,
      status: (loaded === action.data.total) ? 'completed' : 'loaded'
    }

  default:
    return state
  }

}
