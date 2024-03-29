import * as actionTypes from './action_types'

export const begin = () => ({
  type: actionTypes.BEGIN
})

export const clear = () => ({
  type: actionTypes.CLEAR
})

export const cancel = () => ({
  type: actionTypes.CANCEL
})

export const choose = (chosen, index) => ({
  type: actionTypes.CHOOSE,
  chosen,
  index
})

export const type = (q) => ({
  type: actionTypes.TYPE,
  q
})

export const load = (cid, params, endpoint) => ({
  type: 'api/REQUEST',
  method: 'GET',
  endpoint,
  params,
  meta: { cid },
  request: actionTypes.LOAD_REQUEST,
  success: actionTypes.LOAD_SUCCESS,
  failure: actionTypes.LOAD_FAILURE
})

export const lookup = (cid, params, endpoint) => ({
  type: 'api/REQUEST',
  method: 'GET',
  endpoint,
  params,
  meta: { cid },
  request: actionTypes.LOOKUP_REQUEST,
  success: actionTypes.LOOKUP_SUCCESS,
  failure: actionTypes.LOOKUP_FAILURE
})
