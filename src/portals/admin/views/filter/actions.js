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

export function resetAll() {
  return {
    type: actionTypes.RESET_all
  }
}

export function reset(key) {
  return {
    type: actionTypes.RESET,
    key
  }
}

export function update(key, value) {
  return {
    type: actionTypes.UPDATE,
    key,
    value
  }
}
