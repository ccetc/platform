import * as actionTypes from './action_types'

export const toggleApp = (index) => ({
  type: actionTypes.TOGGLE_APP,
  index
})

export const toggleRight = (appIndex, index) => ({
  type: actionTypes.TOGGLE_RIGHT,
  appIndex,
  index
})

export const load = () => ({
  type: 'api/REQUEST',
  method: 'GET',
  endpoint: '/admin/team/access',
  request: actionTypes.LOAD_REQUEST,
  success: actionTypes.LOAD_SUCCESS,
  failure: actionTypes.LOAD_FAILURE
})

export const submit = (endpoint, params) => ({
  type: 'api/REQUEST',
  method: 'GET',
  endpoint,
  params,
  request: actionTypes.SUBMIT_REQUEST,
  success: actionTypes.SUBMIT_SUCCESS,
  failure: actionTypes.SUBMIT_FAILURE
})
