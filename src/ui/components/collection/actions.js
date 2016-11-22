import * as actionTypes from './action_types'
import Api from 'utils/api'

export const sort = key => ({
  type: actionTypes.SORT,
  key
})
