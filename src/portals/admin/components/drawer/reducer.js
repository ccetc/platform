import * as actionTypes from './action_types'
import { INITIAL_STATE as SEARCH_INITIAL_STATE } from '../search/reducer'

export const INITIAL_STATE = {
  drawer: {
    expanded: false,
    app: null,
    item: null
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TOGGLE:
    return {
      ...state,
      ...SEARCH_INITIAL_STATE,
      drawer: {
        expanded: !state.drawer.expanded,
        app: null,
        item: null
      }
    }

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      ...SEARCH_INITIAL_STATE,
      drawer: {
        ...state.drawer,
        app: (state.drawer.app === action.index) ? null : action.index
      }
    }

  case actionTypes.CHOOSE_ITEM:
    return {
      ...state,
      ...SEARCH_INITIAL_STATE,
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
