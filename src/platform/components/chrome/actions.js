import * as actionTypes from './action_types'

export function changeMode(mode) {
  return {
    type: actionTypes.CHANGE_MODE,
    mode
  }
}

export function signin(email, password) {
  if(email == 'gmk8@cornell.edu' && password == 'test') {
    return {
      type: actionTypes.SIGNIN_SUCCESS
    }
  } else  {
    return {
      type: actionTypes.SIGNIN_FAILURE
    }
  }
}

export function reset(email) {
  if(email == 'gmk8@cornell.edu') {
    return {
      type: actionTypes.RESET_SUCCESS
    }
  } else  {
    return {
      type: actionTypes.RESET_FAILURE
    }
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

export function lookup(query) {
  return {
    type: actionTypes.LOOKUP,
    query
  }
}
