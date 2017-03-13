import * as actionTypes from './action_types'

export function open(prompt) {
  return {
    type: actionTypes.OPEN,
    prompt
  }
}

export function close() {
  return {
    type: actionTypes.CLOSE
  }
}
