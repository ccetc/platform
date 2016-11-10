import * as actionTypes from './action_types'
import _ from 'lodash'

const INITIAL_STATE = {
  apps: null,
  drawer: {
    expanded: false,
    app: null,
    item: null
  },
  flash: null,
  permissions: [],
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SIGNOUT:
    return {
      ...state,
      drawer: {
        ...state.drawer
      },
      apps: null,
      user: null
    }

  case actionTypes.SET_FLASH:
    return {
      ...state,
      flash: {
        style: action.style,
        message: action.message
      }
    }

  case actionTypes.CLEAR_FLASH:
    return {
      ...state,
      flash: null
    }

  case actionTypes.TOGGLE_DRAWER:
    return {
      ...state,
      drawer: {
        ...state.drawer,
        expanded: !state.drawer.expanded,
        app: null,
        item: null
      }
    }

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      drawer: {
        ...state.drawer,
        app: (state.drawer.app === action.index) ? null : action.index
      }
    }

  case actionTypes.CHOOSE_ITEM:
    return {
      ...state,
      drawer: {
        ...state.drawer,
        item: action.index,
        expanded: false
      }
    }

  default:
    return state
  }
}
