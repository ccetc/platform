import * as actionTypes from './action_types'

export function toggle() {
  return {
    type: actionTypes.TOGGLE
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
