import React from 'react'
import { connect } from 'react-redux'
import { getActiveTeam } from '../admin/selectors'
import * as actions from './actions'

export class Admin extends React.Component {

  static childContextTypes = {
    admin: React.PropTypes.object
  }

  static propTypes = {
    active: React.PropTypes.number,
    sessions: React.PropTypes.object.isRequired,
    status: React.PropTypes.string.isRequired,
    teams: React.PropTypes.array.isRequired,
    addTeam: React.PropTypes.func.isRequired,
    chooseTeam: React.PropTypes.func.isRequired,
    removeTeam: React.PropTypes.func.isRequired,
    onLoadSession: React.PropTypes.func.isRequired,
    onLoadTeams: React.PropTypes.func.isRequired,
    onSaveTeams: React.PropTypes.func.isRequired
  }

  render() {
    const { children, status } = this.props
    return (status === 'success') ? children : null
  }

  componentDidMount() {
    this.props.onLoadTeams()
  }

  componentDidUpdate(prevProps) {
    const { active, sessions, team, teams } = this.props
    if(prevProps.teams !== teams && prevProps.status !== 'pending') {
      this.props.onSaveTeams(teams)
    }
    if(prevProps.active !== active && team) {
      if(!sessions[team.id]) {
        this.props.onLoadSession(team.id, team.token)
      }
    }
  }

  getChildContext() {
    const { addTeam, chooseTeam, removeTeam } = this.props
    return {
      admin: {
        addTeam,
        chooseTeam,
        removeTeam
      }
    }
  }

}

const mapStateToProps = state => ({
  active: state.admin.active,
  sessions: state.admin.sessions,
  status: state.admin.status,
  team: getActiveTeam(state),
  teams: state.admin.teams
})

const mapDispatchToProps = {
  addTeam: actions.addTeam,
  chooseTeam: actions.chooseTeam,
  removeTeam: actions.removeTeam,
  onLoadTeams: actions.loadTeams,
  onLoadSession: actions.loadSession,
  onSaveTeams: actions.saveTeams
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
