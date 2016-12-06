import * as actionTypes from './action_types'
import api from 'ui/utils/api'

export function reset(cid) {
  return {
    type: actionTypes.RESET,
    cid
  }
}

export function fetch(cid, endpoint, params) {
  return api.get({
    endpoint,
    params,
    meta: { cid },
    request: actionTypes.FETCH_REQUEST,
    success: actionTypes.FETCH_SUCCESS,
    failure: actionTypes.FETCH_FAILURE
  })
}
