import * as actionTypes from './action_types'

export function chooseApp(index) {
  return {
    type: actionTypes.CHOOSE_APP,
    index
  }
}

export function reset() {
  return {
    type: actionTypes.RESET
  }
}
