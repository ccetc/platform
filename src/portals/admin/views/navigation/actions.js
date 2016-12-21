import * as actionTypes from './action_types'

export const toggleMode = () => {
  return {
    type: actionTypes.TOGGLE_MODE
  }
}

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
