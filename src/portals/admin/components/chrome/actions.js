import * as actionTypes from './action_types'

export function transitionTo(route) {
  return {
    type: actionTypes.TRANSITION_TO,
    route
  }
}

export function openModal(component) {
  return {
    type: actionTypes.OPEN_MODAL,
    component
  }
}

export function closeModal() {
  return {
    type: actionTypes.CLOSE_MODAL
  }
}

export function openDrawer(component, location) {
  return {
    type: actionTypes.OPEN_DRAWER,
    component,
    location
  }
}

export function closeDrawer() {
  return {
    type: actionTypes.CLOSE_DRAWER
  }
}

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
