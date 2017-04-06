import * as actionTypes from './action_types'

export const hideStatusBar = (component, location) => ({
  type: actionTypes.HIDE_STATUS_BAR
})

export const showStatusBar = () => ({
  type: actionTypes.SHOW_STATUS_BAR
})
