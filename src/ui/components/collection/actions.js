import * as actionTypes from './action_types'
import Api from 'server/utils/api'

export const sort = key => ({
  type: actionTypes.SORT,
  key
})
