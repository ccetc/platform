// @flow

import * as actionTypes from './action_types'
import Api from 'server/utils/api'

export const fetchResource = (keys, prop, endpoint) => {
  return Api.get({
    endpoint,
    meta: { prop, keys },
    request: actionTypes.FETCH_RESOURCE_REQUEST,
    success: actionTypes.FETCH_RESOURCE_SUCCESS,
    failure: actionTypes.FETCH_RESOURCE_FAILURE
  })
}
