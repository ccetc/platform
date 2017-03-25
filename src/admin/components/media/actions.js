import * as actionTypes from './action_types'

export function changeMode(mode) {
  return {
    type: actionTypes.CHANGE_MODE,
    mode
  }
}

export function changeTool(tool) {
  return {
    type: actionTypes.CHANGE_TOOL,
    tool
  }
}
pushOperation
export function pushOperation(operation) {
  return {
    type: actionTypes.PUSH_OPERATION,
    operation
  }
}
export function popOperation(video) {
  return {
    type: actionTypes.POP_OPERATION,
    video
  }
}

export function previewVideo(video) {
  return {
    type: actionTypes.PREVIEW_VIDEO,
    video
  }
}
