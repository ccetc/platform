import * as actionTypes from './action_types'
import _ from 'lodash'

export const INITIAL_STATE = {
  container: {
    status: 'uninitialized',
    data: {}
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET:
    return {
      ...state,
      ...INITIAL_STATE
    }

  case actionTypes.FETCH_RESOURCE_REQUEST:
    return {
      ...state,
      container: {
        status: 'loading',
        data: {}
      }
    }

  case actionTypes.FETCH_RESOURCE_SUCCESS:
    let data = {
      ...state.container.data,
      [action.prop]: (action.data.data) ? action.data.data : action.data
    }
    let status = _.isEqual(Object.keys(data).sort(), action.keys.sort()) ? 'loaded' : state.container.status
    return {
      ...state,
      container: {
        data,
        status
      }
    }

  case actionTypes.FETCH_RESOURCE_FAILURE:
    return {
      ...state,
      container: {
        ...state.container,
        status: 'failed'
      }
    }

  default:
    return state

  }
}
