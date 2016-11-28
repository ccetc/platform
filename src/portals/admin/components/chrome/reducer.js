import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  chrome: {
    flash: {
      style: null,
      message: null
    },
    drawer: {
      expanded: false,
      app: null,
      route: null
    }
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SET_FLASH:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        flash: {
          style: action.style,
          message: action.message
        }
      }
    }

  case actionTypes.CLEAR_FLASH:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        flash: {
          style: null,
          message: null
        }
      }
    }

  case actionTypes.TOGGLE_DRAWER:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        drawer: {
          expanded: !state.chrome.drawer.expanded,
          app: null,
          route: null
        }
      }
    }

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        drawer: {
          ...state.chrome.drawer,
          app: (state.chrome.drawer.app === action.index) ? null : action.index
        }
      }
    }

  case actionTypes.TRANSITION_TO:
    return {
      ...state,
      chrome: {
        ...state.chrome,
        drawer: {
          expanded: false,
          app: null,
          route: null
        },
        route: action.route
      }
    }

  default:
    return state
  }
}
