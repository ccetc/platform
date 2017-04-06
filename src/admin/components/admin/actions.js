import * as actionTypes from './action_types'

export const loadTeams = () => ({
  type: 'local/GET',
  key: 'teams',
  request: actionTypes.LOAD_TEAMS_REQUEST,
  success: actionTypes.LOAD_TEAMS_SUCCESS,
  failure: actionTypes.LOAD_TEAMS_FAILURE
})

export const saveTeams = (value) => ({
  type: 'local/SET',
  key: 'teams',
  value,
  request: actionTypes.SAVE_TEAMS_REQUEST,
  success: actionTypes.SAVE_TEAMS_SUCCESS,
  failure: actionTypes.SAVE_TEAMS_FAILURE
})

export const loadSession = (tid, token) => ({
  type: 'api/REQUEST',
  method: 'GET',
  endpoint: '/admin/session',
  token,
  meta: { tid },
  request: actionTypes.LOAD_SESSION_REQUEST,
  success: actionTypes.LOAD_SESSION_SUCCESS,
  failure: actionTypes.LOAD_SESSION_FAILURE
})

export const addTeam = (team, token) => ({
  type: actionTypes.ADD_TEAM,
  team,
  token
})

export const removeAllTeams = () => ({
  type: actionTypes.REMOVE_ALL_TEAMS
})

export const removeTeam = (id) => ({
  type: actionTypes.REMOVE_TEAM,
  id
})

export const chooseTeam = index => ({
  type: actionTypes.CHOOSE_TEAM,
  index
})

export const markRead = (tid, ids) => ({
  type: 'api/REQUEST',
  method: 'PATCH',
  endpoint: '/admin/notifications/read',
  meta: { tid },
  params: { ids },
  request: actionTypes.MARK_READ_REQUEST,
  success: actionTypes.MARK_READ_SUCCESS,
  failure: actionTypes.MARK_READ_FAILURE
})

export const updateNotifications = (tid, unread) => ({
  type: actionTypes.UPDATE_NOTIFICATIONS,
  tid,
  unread
})
