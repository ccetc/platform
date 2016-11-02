import * as actionTypes from './action_types'

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
