import * as actionTypes from './action_types'
import Api from 'utils/api'

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

export function completeSearch(index) {
  return {
    type: actionTypes.COMPLETE_SEARCH,
    index
  }
}

export function lookup(q) {
  return Api.get({
    params: { q },
    endpoint: '/admin/search',
    request: lookupRequest,
    success: lookupSuccess,
    failure: lookupFailure
  })
}

export function lookupRequest(request) {
  return {
    type: actionTypes.LOOKUP_REQUEST,
    params: request.params
  }
}

export function lookupSuccess(response) {
  return {
    type: actionTypes.LOOKUP_SUCCESS,
    results: response.entity.contacts
  }
}

export function lookupFailure(response) {
  return {
    type: actionTypes.LOOKUP_FAILURE,
    error: response.entity
  }
}
