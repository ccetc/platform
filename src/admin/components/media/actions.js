import * as actionTypes from './action_types'

export const changeMode = (mode) => ({
  type: actionTypes.CHANGE_MODE,
  mode
})

export const changeTool = (tool) => ({
  type: actionTypes.CHANGE_TOOL,
  tool
})

export const pushOperation = (operation) => ({
  type: actionTypes.PUSH_OPERATION,
  operation
})

export const popOperation = (video) => ({
  type: actionTypes.POP_OPERATION,
  video
})

export const previewVideo = (video) =>({
  type: actionTypes.PREVIEW_VIDEO,
  video
})
