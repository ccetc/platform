import * as actionTypes from './action_types'
import local from 'server/utils/local'
import api from 'server/utils/api'

export function loadToken() {
  return local.get({
    key: 'token',
    request: actionTypes.LOAD_TOKEN_REQUEST,
    success: actionTypes.LOAD_TOKEN_SUCCESS,
    failure: actionTypes.LOAD_TOKEN_FAILURE
  })
}

export function saveToken(token) {
  return local.set({
    key: 'token',
    value: token,
    request: actionTypes.SAVE_TOKEN_REQUEST,
    success: actionTypes.SAVE_TOKEN_SUCCESS,
    failure: actionTypes.SAVE_TOKEN_FAILURE
  })
}

export function signout(token) {
  return local.remove({
    key: 'token',
    request: actionTypes.SIGNOUT_REQUEST,
    success: actionTypes.SIGNOUT_SUCCESS,
    failure: actionTypes.SIGNOUT_FAILURE
  })
}

export function signin(token) {
  return api.post({
    token,
    endpoint: '/admin/auth',
    request: actionTypes.SIGNIN_REQUEST,
    success: actionTypes.SIGNIN_SUCCESS,
    failure: actionTypes.SIGNIN_FAILURE
  })
}

export function loadSession(token) {
  return api.get({
    token,
    endpoint: '/admin/session',
    request: actionTypes.LOAD_SESSION_REQUEST,
    success: actionTypes.LOAD_SESSION_SUCCESS,
    failure: actionTypes.LOAD_SESSION_FAILURE
  })
}
