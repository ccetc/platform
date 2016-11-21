import * as actionTypes from './action_types'
import Api from 'utils/api'
import localStorage from 'services/local_storage'

export function loadToken() {
  return dispatch => {
    dispatch(loadTokenRequest())
    return localStorage.getItem('token', function(err, token) {
      if(token) {
        return dispatch(loadTokenSuccess(token))
      } else {
        return dispatch(loadTokenFailure())
      }
    })
  }
}

export function loadTokenRequest() {
  return {
    type: actionTypes.LOAD_TOKEN_REQUEST
  }
}
export function loadTokenSuccess(token) {
  return {
    type: actionTypes.LOAD_TOKEN_SUCCESS,
    token: token
  }
}

export function loadTokenFailure() {
  return {
    type: actionTypes.LOAD_TOKEN_FAILURE
  }
}

export function saveToken(token) {
  localStorage.setItem('token', token, function(err, token) {
    return dispatch => {
      if(token) {
        dispatch(saveTokenSuccess(token))
      } else {
        dispatch(saveTokenFailure())
      }
    }
  })
}

export function saveTokenSuccess(token) {
  return {
    type: actionTypes.SAVE_TOKEN_SUCCESS,
    token: token
  }
}

export function saveTokenFailure() {
  return {
    type: actionTypes.SAVE_TOKEN_FAILURE
  }
}

export function signin(token) {
  return Api.post({
    token,
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
