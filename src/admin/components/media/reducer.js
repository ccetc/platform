import * as actionTypes from './action_types'

const INITIAL_VALUE = {
  video: null
}

export default (state = INITIAL_VALUE, action) => {

  switch (action.type) {

  case actionTypes.PREVIEW_VIDEO:
    return {
      ...state,
      video: action.video
    }

  default:
    return state

  }

}
