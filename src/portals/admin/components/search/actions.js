import * as actionTypes from './action_types'
import Api from 'server/utils/api'

export function beginSearch() {
  return {
    type: actionTypes.BEGIN_SEARCH
  }
}

export function abortSearch() {
  return {
    type: actionTypes.ABORT_SEARCH
  }
}

export function completeSearch(model, index) {
  return {
    type: actionTypes.COMPLETE_SEARCH,
    model,
    index
  }
}

export function lookup(q) {
  return Api.get({
    params: { q },
    endpoint: '/admin/search',
    request: actionTypes.LOOKUP_REQUEST,
    success: actionTypes.LOOKUP_SUCCESS,
    failure: actionTypes.LOOKUP_FAILURE
  })
}
