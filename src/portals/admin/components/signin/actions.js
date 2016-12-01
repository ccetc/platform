import * as actionTypes from './action_types'
import api from 'ui/utils/api'

export function setup() {
  return {
    type: actionTypes.SETUP
  }
}

export function signin(email, password) {
  return api.post({
    params: { email, password },
    endpoint: '/admin/auth',
    request: actionTypes.SIGNIN_REQUEST,
    success: actionTypes.SIGNIN_SUCCESS,
    failure: actionTypes.SIGNIN_FAILURE
  })
}
