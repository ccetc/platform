import * as actionTypes from './action_types'

export const fetchResource = (prop, endpoint) => ({
  type: 'api/REQUEST',
  method: 'GET',
  endpoint,
  meta: { prop, endpoint },
  request: actionTypes.FETCH_RESOURCE_REQUEST,
  success: actionTypes.FETCH_RESOURCE_SUCCESS,
  failure: actionTypes.FETCH_RESOURCE_FAILURE
})

export const clearResource = (prop) => ({
  type: actionTypes.CLEAR_RESOURCE,
  prop
})
