import * as actionTypes from './action_types'
import Api from 'utils/api'

export function reset(email) {
  return Api.post({
    params: { email },
    endpoint: '/admin/reset',
    request: resetRequest,
    success: resetSuccess,
    failure: resetFailure
  })
}

export function resetRequest(request) {
  return {
    type: actionTypes.RESET_REQUEST
  }
}

export function resetSuccess(response) {
  return {
    type: actionTypes.RESET_SUCCESS
  }
}

export function resetFailure(response) {
  return {
    type: actionTypes.RESET_FAILURE,
    error: response.entity
  }
}
