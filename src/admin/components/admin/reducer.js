import * as actionTypes from './action_types'
import _ from 'lodash'

const INITIAL_STATE = {
  status: 'pending',
  teams: [],
  sessions: {}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_TEAMS_SUCCESS:
    return {
      ...state,
      status: 'success',
      teams: action.value || [],
      sessions: {}
    }

  case actionTypes.LOAD_TEAMS_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  case actionTypes.ADD_TEAM:
    return {
      ...state,
      teams: [
        ...state.teams.map(team => {
          return {
            ...team,
            active: false
          }
        }),
        {
          ...action.team,
          token: action.token,
          active: true
        }
      ]
    }

  case actionTypes.CHOOSE_TEAM:
    return {
      ...state,
      teams: state.teams.map((team, index) => {
        return {
          ...team,
          active: (index === action.index)
        }
      })
    }

  case actionTypes.REMOVE_TEAM:
    const sessions = _.omit(state.sessions, [action.id])
    const teams = _.filter(state.teams, team => (team.id !== action.id))
    return {
      ...state,
      sessions,
      teams: teams.map((team, index) => {
        return {
          ...team,
          active: (index === teams.length - 1)
        }
      })
    }

  case actionTypes.REMOVE_ALL_TEAMS:
    return {
      ...state,
      teams: [],
      sessions: {}
    }

  case actionTypes.LOAD_SESSION_SUCCESS:
    return {
      ...state,
      sessions: {
        ...state.sessions,
        [action.tid]: action.data
      }
    }

  case actionTypes.MARK_READ_SUCCESS:
    return {
      ...state,
      sessions: {
        ...state.sessions,
        [action.tid]: {
          ...state.sessions[action.tid],
          user: {
            ...state.sessions[action.tid].user,
            unread: 0
          }
        }
      }
    }

  case actionTypes.UPDATE_NOTIFICATIONS:
    return {
      ...state,
      sessions: {
        ...state.sessions,
        [action.tid]: {
          ...state.sessions[action.tid],
          user: {
            ...state.sessions[action.tid].user,
            unread: action.unread
          }
        }
      }
    }

  default:
    return state
  }


}
