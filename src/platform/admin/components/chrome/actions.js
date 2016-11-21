import * as actionTypes from './action_types'
import Api from 'utils/api'

export function changeMode(mode) {
  return {
    type: actionTypes.CHANGE_MODE,
    mode
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
