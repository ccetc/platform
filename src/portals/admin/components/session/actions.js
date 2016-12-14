import * as actionTypes from './action_types'
import api from 'portals/admin/utils/api'

export function load(token) {
  return api.get({
    token,
    endpoint: '/admin/session',
    request: actionTypes.LOAD_REQUEST,
    success: actionTypes.LOAD_SUCCESS,
    failure: actionTypes.LOAD_FAILURE
  })
}
