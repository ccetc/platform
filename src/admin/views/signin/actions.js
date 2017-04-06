import * as actionTypes from './action_types'

export const team = (subdomain) => ({
  type: 'api/REQUEST',
  method: 'POST',
  endpoint: '/admin/signin/teams',
  params: { subdomain },
  request: actionTypes.TEAM_REQUEST,
  success: actionTypes.TEAM_SUCCESS,
  failure: actionTypes.TEAM_FAILURE
})

export const email = (team_id, email) => ({
  type: 'api/REQUEST',
  method: 'POST',
  endpoint: '/admin/signin/email',
  params: { team_id, email },
  request: actionTypes.EMAIL_REQUEST,
  success: actionTypes.EMAIL_SUCCESS,
  failure: actionTypes.EMAIL_FAILURE
})

export const changeMode = (mode) => ({
  type: actionTypes.CHANGE_MODE,
  mode
})

export const togglePassword = () => ({
  type: actionTypes.TOGGLE_PASSWORD
})

export const password = (team_id, email, password) => ({
  type: 'api/REQUEST',
  method: 'POST',
  endpoint: '/admin/signin/password',
  params: { team_id, email, password },
  request: actionTypes.PASSWORD_REQUEST,
  success: actionTypes.PASSWORD_SUCCESS,
  failure: actionTypes.PASSWORD_FAILURE
})

export const forgot = (team_id, email) => ({
  type: 'api/REQUEST',
  method: 'POST',
  endpoint: '/admin/signin/forgot',
  params: { team_id, email },
  request: actionTypes.FORGOT_REQUEST,
  success: actionTypes.FORGOT_SUCCESS,
  failure: actionTypes.FORGOT_FAILURE
})

export const reset = () => ({
  type: actionTypes.RESET
})
