import * as actionTypes from './action_types'
import Api from 'server/utils/api'

export function transitionTo(route) {
  return {
    type: actionTypes.TRANSITION_TO,
    route
  }
}

export function setFlash(style, message) {
  return {
    type: actionTypes.SET_FLASH,
    style,
    message
  }
}

export function clearFlash() {
  return {
    type: actionTypes.CLEAR_FLASH
  }
}

export function toggleDrawer() {
  return {
    type: actionTypes.TOGGLE_DRAWER
  }
}

export function chooseApp(index) {
  return {
    type: actionTypes.CHOOSE_APP,
    index
  }
}

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
