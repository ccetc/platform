import * as actionTypes from './action_types'

export const sort = (cid, key) => ({
  type: actionTypes.SORT,
  cid,
  key
})
