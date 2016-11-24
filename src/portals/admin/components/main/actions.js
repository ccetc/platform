import * as actionTypes from './action_types'

export function toggleTasks() {
  return {
    type: actionTypes.TOGGLE_TASKS
  }
}

export function chooseTask(index) {
  return {
    type: actionTypes.CHOOSE_TASK,
    index
  }
}
