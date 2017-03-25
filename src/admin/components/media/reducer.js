import * as actionTypes from './action_types'

const INITIAL_VALUE = {
  mode: null,
  video: null,
  tool: [],
  operations: [
    { w: 667 },
    { bri: 50 },
    { con: -50 }
  ]
}

export default (state = INITIAL_VALUE, action) => {

  switch (action.type) {

  case actionTypes.CHANGE_MODE:
    return {
      ...state,
      mode: action.mode
    }

  case actionTypes.CHANGE_TOOL:
    return {
      ...state,
      tool: action.tool
    }

  case actionTypes.PREVIEW_VIDEO:
    return {
      ...state,
      video: action.video
    }

  case actionTypes.PUSH_OPERATION:
    return {
      ...state,
      operations: [
        ...state.operations,
        action.operation
      ]
    }

  case actionTypes.POP_OPERATION:
    return {
      ...state,
      operations: state.operations.slice(0, state.operations.length - 1)
    }

  default:
    return state

  }

}
