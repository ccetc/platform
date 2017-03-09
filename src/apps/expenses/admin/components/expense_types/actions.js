import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function load(project_id) {
  return api.get({
    endpoint: `/admin/expenses/projects/${project_id}/expense_types/all`,
    request: actionTypes.LOAD_REQUEST,
    success: actionTypes.LOAD_SUCCESS,
    failure: actionTypes.LOAD_FAILURE
  })
}

export function toggle(project_id, id) {
  return api.patch({
    endpoint: `/admin/expenses/projects/${project_id}/expense_types/${id}/toggle`,
    request: actionTypes.TOGGLE_REQUEST,
    success: actionTypes.TOGGLE_SUCCESS,
    failure: actionTypes.TOGGLE_FAILURE
  })
}
