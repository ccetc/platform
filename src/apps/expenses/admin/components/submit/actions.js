import * as actionTypes from './action_types'
import api from 'admin/utils/api'

export function submit(type, id) {
  return api.patch({
    endpoint: `/admin/expenses/${type}/${id}/submit`,
    request: actionTypes.SUBMIT_REQUEST,
    success: actionTypes.SUBMIT_SUCCESS,
    failure: actionTypes.SUBMIT_FAILURE
  })
}
