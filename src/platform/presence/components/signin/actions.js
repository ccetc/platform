import * as actionTypes from './action_types'
import Api from 'utils/api'

export function signin(email, password) {
  return Api.post({
    params: { email, password },
    endpoint: '/admin/authenticate',
    request: signinRequest,
    success: signinSuccess,
    failure: signinFailure
  })
}

export function signinRequest(request) {
  return {
    type: actionTypes.SIGNIN_REQUEST
  }
}

export function signinSuccess(response) {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    session: response.entity
  }
}

export function signinFailure(response) {
  return {
    type: actionTypes.SIGNIN_FAILURE,
    error: response.entity
  }
}
