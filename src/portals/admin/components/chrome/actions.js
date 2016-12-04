import * as actionTypes from './action_types'

export function transitionTo(route) {
  return {
    type: actionTypes.TRANSITION_TO,
    route
  }
}
