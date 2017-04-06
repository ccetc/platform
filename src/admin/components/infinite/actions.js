import * as actionTypes from './action_types'

export const reset = (cid) => ({
  type: actionTypes.RESET,
  cid
})

export const fetch = (cid, endpoint, params) => ({
  type: 'api/REQUEST',
  method: 'GET',
  endpoint,
  params,
  meta: { cid },
  request: actionTypes.FETCH_REQUEST,
  success: actionTypes.FETCH_SUCCESS,
  failure: actionTypes.FETCH_FAILURE
})
