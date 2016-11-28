import * as actionTypes from './action_types'

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
