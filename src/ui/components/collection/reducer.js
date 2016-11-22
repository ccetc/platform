import * as actionTypes from './action_types'
import _ from 'lodash'

export const INITIAL_STATE = {
  collection: {
    params: {
      filter: {},
      sort: {
        key: 'created_at',
        order: 'desc'
      }
    }
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SORT:
    return {
      ...state,
      collection: {
        ...state.collection,
        params: {
          ...state.collection.params,
          sort: {
            key: action.key,
            order: (state.collection.params.sort.key == action.key && state.collection.params.sort.order == 'asc') ? 'desc' : 'asc'
          }
        }
      }
    }

  default:
    return state

  }

}
