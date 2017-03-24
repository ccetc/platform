import * as actionTypes from './action_types'

export function previewVideo(video) {
  return {
    type: actionTypes.PREVIEW_VIDEO,
    video
  }
}
