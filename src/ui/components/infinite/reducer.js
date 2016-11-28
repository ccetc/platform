import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  infinite: {
    status: 'pending',
    records: [],
    loaded: 0,
    total: 0
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET:
    return {
      ...state,
      ...INITIAL_STATE
    }

  case actionTypes.FETCH_REQUEST:
    return {
      ...state,
      infinite: {
        ...state.infinite,
        records: (action.params['$skip'] > 0) ? state.infinite.records : [],
        status: 'loading'
      }
    }

  case actionTypes.FETCH_SUCCESS:
    return {
      ...state,
      infinite: {
        ...state.infinite,
        records: [
          ...state.infinite.records,
          ...action.data.data
        ],
        loaded: state.infinite.records.length + action.data.data.length,
        total: action.data.total,
        status: 'loaded'
      }
    }

  default:
    return state
  }

}
