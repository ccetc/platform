import * as actionTypes from './action_types'
import api from 'ui/utils/api'

export function load(domain) {
  return api.get({
    domain,
    endpoint: '/admin/instance',
    request: actionTypes.LOAD_INSTANCE_REQUEST,
    success: actionTypes.LOAD_INSTANCE_SUCCESS,
    failure: actionTypes.LOAD_INSTANCE_FAILURE
  })
}
