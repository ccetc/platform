import * as actionTypes from './action_types'

export function transitionTo(route) {
  return {
    type: actionTypes.TRANSITION_TO,
    route
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
