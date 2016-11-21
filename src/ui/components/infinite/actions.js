import * as actionTypes from './action_types'
import Api from 'utils/api'

export function fetch(endpoint, params) {
  return Api.get({
    endpoint,
    params,
    request: actionTypes.FETCH_REQUEST,
    success: actionTypes.FETCH_SUCCESS,
    failure: actionTypes.FETCH_FAILURE
  })
}
