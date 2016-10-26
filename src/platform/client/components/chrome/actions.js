import * as actionTypes from './action_types'

export function toggleDrawer() {
  return {
    type: actionTypes.TOGGLE_DRAWER
  }
}

export function changeApp(index) {
  return {
    type: actionTypes.CHANGE_APP,
    index
  }
}
