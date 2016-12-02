import * as actionTypes from './action_types'

export function openTasks(tasks) {
  return {
    type: actionTypes.OPEN_TASKS,
    tasks
  }
}

export function closeTasks() {
  return {
    type: actionTypes.CLOSE_TASKS
  }
}
