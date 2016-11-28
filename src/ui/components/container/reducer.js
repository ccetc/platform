import * as actionTypes from './action_types'
import _ from 'lodash'

export const INITIAL_STATE = {
  status: 'uninitialized',
  data: {}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.FETCH_RESOURCE_REQUEST:
    return {
      status: 'loading',
      data: {}
    }

  case actionTypes.FETCH_RESOURCE_SUCCESS:
    let data = {
      ...state.data,
      [action.prop]: (action.data.data) ? action.data.data : action.data
    }
    let status = _.isEqual(Object.keys(data).sort(), action.keys.sort()) ? 'loaded' : state.status
    return {
      data,
      status
    }

  case actionTypes.FETCH_RESOURCE_FAILURE:
    return {
      ...state,
      status: 'failed'
    }

  default:
    return state

  }
}
