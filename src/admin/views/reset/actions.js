import * as actionTypes from './action_types'

export const setToken = (token) => ({
  type: actionTypes.SET_TOKEN,
  token
})

export const claim = (token) => ({
  type: 'api/REQUEST',
  method: 'GET',
  params: { token },
  endpoint: '/admin/reset/claim',
  request: actionTypes.CLAIM_REQUEST,
  success: actionTypes.CLAIM_SUCCESS,
  failure: actionTypes.CLAIM_FAILURE
})

export const verify = (token, security_question_index, answer) => ({
  type: 'api/REQUEST',
  method: 'POST',
  params: { token, security_question_index, answer },
  endpoint: '/admin/reset/security',
  request: actionTypes.SECURITY_REQUEST,
  success: actionTypes.SECURITY_SUCCESS,
  failure: actionTypes.SECURITY_FAILURE
})

export const reset = (token, password, confirm) => ({
  type: 'api/REQUEST',
  method: 'POST',
  params: { token, password, confirm },
  endpoint: '/admin/reset/password',
  request: actionTypes.PASSWORD_REQUEST,
  success: actionTypes.PASSWORD_SUCCESS,
  failure: actionTypes.PASSWORD_FAILURE
})
