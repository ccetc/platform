import _ from 'lodash'
import * as actionTypes from './action_types'

export default (state, action, reducer) => {

  switch (action.type) {

  case actionTypes.ADD_COMPONENT:
    return  {
      ...state,
      [action.namespace]: reducer(state[action.namespace], { type: null, cid: action.cid })
    }

  case actionTypes.REMOVE_COMPONENT:
    return  {
      ...state,
      [action.namespace]: _.omit(state[action.namespace], action.cid)
    }

  default:
    return state

  }
}
