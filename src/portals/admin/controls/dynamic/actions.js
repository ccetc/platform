import * as actionTypes from './action_types'
import api from 'portals/admin/utils/api'

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
