import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function begin() {
  return {
    type: actionTypes.BEGIN
  }
}

export function clear() {
  return {
    type: actionTypes.CLEAR
  }
}

export function cancel() {
  return {
    type: actionTypes.CANCEL
  }
}

export function choose(index) {
  return {
    type: actionTypes.CHOOSE,
    index
  }
}

export function type(q) {
  return {
    type: actionTypes.TYPE,
    q
  }
}

export function load(cid, params, endpoint) {
  return api.get({
    params,
    endpoint,
    meta: { cid },
    request: actionTypes.LOAD_REQUEST,
    success: actionTypes.LOAD_SUCCESS,
    failure: actionTypes.LOAD_FAILURE
  })
}

export function lookup(cid, params, endpoint) {
  return api.get({
    params,
    endpoint,
    meta: { cid },
    request: actionTypes.LOOKUP_REQUEST,
    success: actionTypes.LOOKUP_SUCCESS,
    failure: actionTypes.LOOKUP_FAILURE
  })
}
