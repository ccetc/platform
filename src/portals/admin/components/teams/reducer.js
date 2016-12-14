import _ from 'lodash'
import * as actionTypes from './action_types'

const INITIAL_STATE = {
  active: null,
  status: 'pending',
  teams: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_SUCCESS:
    return {
      ...state,
      active: action.value ? 0 : null,
      status: 'success',
      teams: action.value || []
    }

  case actionTypes.LOAD_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  case actionTypes.ADD:
    return {
      ...state,
      active: state.teams.length,
      teams: [
        ...state.teams,
        {
          ...action.team,
          token: action.token
        }
      ]
    }

  case actionTypes.REMOVE:
    const teams = [
      ...state.teams.slice(0, action.index),
      ...state.teams.slice(action.index + 1)
    ]
    return {
      ...state,
      active: Math.max(teams.length - 1, 0),
      teams
    }

  case actionTypes.CHOOSE:
    return {
      ...state,
      active: action.index
    }

  default:
    return state
  }


}
