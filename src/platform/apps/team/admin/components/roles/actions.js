import * as actionTypes from './action_types'
import api from 'portals/admin/utils/api'

export function toggle(index) {
  return {
    type: actionTypes.TOGGLE,
    index
  }
}

export function submit(endpoint, params) {
  return api.get({
    endpoint,
    params,
    request: actionTypes.SUBMIT_REQUEST,
    success: actionTypes.SUBMIT_SUBMIT,
    failure: actionTypes.SUBMIT_FAILURE
  })
}
