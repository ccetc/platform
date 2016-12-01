import * as actionTypes from './action_types'
import api from 'ui/utils/api'

export function setup() {
  return {
    type: actionTypes.SETUP
  }
}

export function reset(email) {
  return api.post({
    params: { email },
    endpoint: '/admin/reset',
    request: actionTypes.RESET_REQUEST,
    success: actionTypes.RESET_SUCCESS,
    failure: actionTypes.RESET_FAILURE
  })
}
