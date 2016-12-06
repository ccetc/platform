import multireducer from 'ui/multireducer'
import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  params: {
    filter: {},
    sort: {
      key: 'created_at',
      order: 'desc'
    }
  }
}

export default multireducer((state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SORT:
    return {
      ...state,
      params: {
        ...state.params,
        sort: {
          key: action.key,
          order: (state.params.sort.key == action.key && state.params.sort.order == 'asc') ? 'desc' : 'asc'
        }
      }
    }

  default:
    return state

  }

})
