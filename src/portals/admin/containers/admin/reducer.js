import * as actionTypes from './action_types'
import _ from 'lodash'

const INITIAL_STATE = {
  active: null,
  status: 'pending',
  teams: [],
  sessions: {}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_TEAMS_SUCCESS:
    return {
      ...state,
      active: action.value && action.value.length > 0 ? 0 : null,
      status: 'success',
      teams: action.value || []
    }

  case actionTypes.LOAD_TEAMS_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  case actionTypes.ADD_TEAM:
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

  case actionTypes.REMOVE_TEAM:
    const team = state.teams[action.index]
    const sessions = _.omit(state.sessions, [team.id])
    const teams = [
      ...state.teams.slice(0, action.index),
      ...state.teams.slice(action.index + 1)
    ]
    return {
      ...state,
      active: teams.length === 0 ? null : teams.length - 1,
      sessions,
      teams
    }

  case actionTypes.CHOOSE_TEAM:
    return {
      ...state,
      active: action.index
    }

  case actionTypes.LOAD_SESSION_SUCCESS:
    return {
      ...state,
      sessions: {
        ...state.sessions,
        [action.tid]: action.data
      }
    }


  default:
    return state
  }


}