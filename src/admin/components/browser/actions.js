import * as actionTypes from './action_types'

export const loadPreferences = () => ({
  type: 'local/GET',
  key: 'preferences',
  request: actionTypes.LOAD_PREFERENCES_REQUEST,
  success: actionTypes.LOAD_PREFERENCES_SUCCESS,
  failure: actionTypes.LOAD_PREFERENCES_FAILURE
})

export const savePreferences = (value) => ({
  type: 'local/SET',
  key: 'preferences',
  value,
  request: actionTypes.SAVE_PREFERENCES_REQUEST,
  success: actionTypes.SAVE_PREFERENCES_SUCCESS,
  failure: actionTypes.SAVE_PREFERENCES_FAILURE
})

export const setPreference = (key, value) => ({
  type: actionTypes.SET_PREFERENCE,
  key,
  value
})
