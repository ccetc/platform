import * as actionTypes from './action_types'
import api from 'admin/utils/api'
import local from 'admin/utils/local'

export function loadTeams() {
  return local.get({
    key: 'teams',
    request: actionTypes.LOAD_TEAMS_REQUEST,
    success: actionTypes.LOAD_TEAMS_SUCCESS,
    failure: actionTypes.LOAD_TEAMS_FAILURE
  })
}

export function saveTeams(value) {
  return local.set({
    key: 'teams',
    value,
    request: actionTypes.SAVE_TEAMS_REQUEST,
    success: actionTypes.SAVE_TEAMS_SUCCESS,
    failure: actionTypes.SAVE_TEAMS_FAILURE
  })
}

export function loadSession(tid, token) {
  return api.get({
    token,
    meta: { tid },
    endpoint: '/admin/session',
    request: actionTypes.LOAD_SESSION_REQUEST,
    success: actionTypes.LOAD_SESSION_SUCCESS,
    failure: actionTypes.LOAD_SESSION_FAILURE
  })
}

export const addTeam = (team, token) => {
  return {
    type: actionTypes.ADD_TEAM,
    team,
    token
  }
}

export const removeTeam = id => {
  return {
    type: actionTypes.REMOVE_TEAM,
    id
  }
}

export const chooseTeam = index => {
  return {
    type: actionTypes.CHOOSE_TEAM,
    index
  }
}

export const markRead = (tid, ids) => {
  return api.patch({
    meta: { tid },
    params: { ids },
    endpoint: '/admin/notifications/read',
    request: actionTypes.MARK_READ_REQUEST,
    success: actionTypes.MARK_READ_SUCCESS,
    failure: actionTypes.MARK_READ_FAILURE
  })
}
