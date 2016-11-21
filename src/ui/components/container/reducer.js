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

  case actionTypes.FETCH_RESOURCE_REQUEST:
    return {
      ...state,
      container: {
        ...state.container,
        status: 'loading'
      }
    }

  case actionTypes.FETCH_RESOURCE_SUCCESS:
    let data = (action.data.data) ? action.data.data : action.data
    return {
      ...state,
      container: {
        data: {
          ...state.container.data,
          [action.prop]: data
        },
        status: 'loaded'
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
