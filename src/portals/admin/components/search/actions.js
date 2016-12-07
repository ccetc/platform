import * as actionTypes from './action_types'
import api from 'ui/utils/api'

export function resetSearch() {
  return {
    type: actionTypes.RESET_SEARCH
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
  return api.get({
    params: { q },
    endpoint: '/admin/search',
    request: actionTypes.LOOKUP_REQUEST,
    success: actionTypes.LOOKUP_SUCCESS,
    failure: actionTypes.LOOKUP_FAILURE
  })
}
