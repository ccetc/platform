import * as actionTypes from './action_types'
import local from 'portals/admin/utils/local'

export function load() {
  return local.get({
    key: 'teams',
    request: actionTypes.LOAD_REQUEST,
    success: actionTypes.LOAD_SUCCESS,
    failure: actionTypes.LOAD_FAILURE
  })
}

export function save(value) {
  return local.set({
    key: 'teams',
    value,
    request: actionTypes.SAVE_REQUEST,
    success: actionTypes.SAVE_SUCCESS,
    failure: actionTypes.SAVE_FAILURE
  })
}

export const add = (team, token) => {
  return {
    type: actionTypes.ADD,
    team,
    token
  }
}

export const remove = index => {
  return {
    type: actionTypes.REMOVE,
    index
  }
}

export const choose = index => {
  return {
    type: actionTypes.CHOOSE,
    index
  }
}
