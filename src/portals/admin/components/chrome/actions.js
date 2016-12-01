import * as actionTypes from './action_types'
import api from 'ui/utils/api'

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

export function chooseApp(index) {
  return {
    type: actionTypes.CHOOSE_APP,
    index
  }
}

export function beginSearch() {
  return {
    type: actionTypes.BEGIN_SEARCH
  }
}

export function abortSearch() {
  return {
    type: actionTypes.ABORT_SEARCH
  }
}

export function completeSearch(model, index) {
  return {
    type: actionTypes.COMPLETE_SEARCH,
    model,
    index
  }
}

export function lookup(q) {
  return api.get({
    params: { q },
    endpoint: '/admin/search',
    request: actionTypes.LOOKUP_REQUEST,
    success: actionTypes.LOOKUP_SUCCESS,
    failure: actionTypes.LOOKUP_FAILURE
  })
}
