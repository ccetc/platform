import * as actionTypes from './action_types'

export function choose(index) {
  return {
    type: actionTypes.CHOOSE,
    index
  }
}

export function back() {
  return {
    type: actionTypes.BACK
  }
}

export function reset() {
  return {
    type: actionTypes.RESET
  }
}

export function update(key, value) {
  return {
    type: actionTypes.UPDATE,
    key,
    value
  }
}
