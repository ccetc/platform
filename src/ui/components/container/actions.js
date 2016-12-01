// @flow

import * as actionTypes from './action_types'
import api from 'ui/utils/api'

export const fetchResource = (cid, keys, prop, endpoint) => {
  return api.get({
    endpoint,
    meta: { cid, prop, keys },
    request: actionTypes.FETCH_RESOURCE_REQUEST,
    success: actionTypes.FETCH_RESOURCE_SUCCESS,
    failure: actionTypes.FETCH_RESOURCE_FAILURE
  })
}
