import * as actionTypes from './action_types'
import api from 'ui/utils/api'

export function reset() {
  return {
    type: actionTypes.RESET
  }
}

export function fetch(endpoint, params) {
  return api.get({
    endpoint,
    params,
    request: actionTypes.FETCH_REQUEST,
    success: actionTypes.FETCH_SUCCESS,
    failure: actionTypes.FETCH_FAILURE
  })
}
