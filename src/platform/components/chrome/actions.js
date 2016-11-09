import * as actionTypes from './action_types'
import Api from '../../../utils/api'

export function changeMode(mode) {
  return {
    type: actionTypes.CHANGE_MODE,
    mode
  }
}

export function signin(email, password) {
  return Api.post({
    params: { email, password },
    endpoint: '/admin/authenticate',
    request: signinRequest,
    success: signinSuccess,
    failure: signinFailure
  })
}

export function signinRequest(request) {
  return {
    type: actionTypes.SIGNIN_REQUEST
  }
}

export function signinSuccess(response) {
  return {
    type: actionTypes.SIGNIN_SUCCESS
  }
}

export function signinFailure(response) {
  return {
    type: actionTypes.SIGNIN_FAILURE,
    error: response.entity
  }
}

export function reset(email) {
  return Api.post({
    params: { email },
    endpoint: '/admin/reset',
    request: resetRequest,
    success: resetSuccess,
    failure: resetFailure
  })
}

export function resetRequest(request) {
  return {
    type: actionTypes.RESET_REQUEST
  }
}

export function resetSuccess(response) {
  return {
    type: actionTypes.RESET_SUCCESS
  }
}

export function resetFailure(response) {
  return {
    type: actionTypes.RESET_FAILURE,
    error: response.entity
  }
}

export function signout() {
  return {
    type: actionTypes.SIGNOUT
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

export function chooseItem(index) {
  return {
    type: actionTypes.CHOOSE_ITEM,
    index
  }
}

export function pushNotification(notification) {
  return {
    type: actionTypes.PUSH_NOTIFICATION, notification
  }
}

export function readNotification(id) {
  return {
    type: actionTypes.READ_NOTIFICATION,
    id
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
