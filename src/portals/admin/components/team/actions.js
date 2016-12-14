import * as actionTypes from './action_types'
import api from 'portals/admin/utils/api'

export function load(domain) {
  return api.get({
    domain,
    endpoint: '/admin/team',
    request: actionTypes.LOAD_INSTANCE_REQUEST,
    success: actionTypes.LOAD_INSTANCE_SUCCESS,
    failure: actionTypes.LOAD_INSTANCE_FAILURE
  })
}
