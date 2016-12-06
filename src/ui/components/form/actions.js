import * as actionTypes from './action_types'
import api from 'ui/utils/api'

export const setSections = (cid, sections) => ({
  type: actionTypes.SET_SECTIONS,
  cid,
  sections
})

export function fetchData(cid, endpoint) {
  return api.get({
    meta: { cid },
    endpoint,
    request: actionTypes.FETCH_DATA_REQUEST,
    success: actionTypes.FETCH_DATA_SUCCESS,
    failure: actionTypes.FETCH_DATA_FAILURE
  })
}

export const setData = (cid, data) => ({
  type: actionTypes.SET_DATA,
  cid,
  data
})

export const setReady = (cid) => ({
  type: actionTypes.SET_READY,
  cid
})

export const updateData = (cid, key, value) => ({
  type: actionTypes.UPDATE_DATA,
  cid,
  key,
  value
})

export const submitForm = (cid, method, endpoint, params) => {
  return api.request({
    method,
    params,
    meta: { cid },
    endpoint,
    request: actionTypes.SUBMIT_REQUEST,
    success: actionTypes.SUBMIT_SUCCESS,
    failure: actionTypes.SUBMIT_FAILURE
  })
}
