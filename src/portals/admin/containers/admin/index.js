import React from 'react'
import { connect } from 'react-redux'
import { getActiveTeam } from '../admin/selectors'
import * as actions from './actions'

export class Admin extends React.Component {

  static childContextTypes = {
    admin: React.PropTypes.object
  }

  static contextTypes = {
    flash: React.PropTypes.object,
    router: React.PropTypes.object
  }

  static propTypes = {
    sessions: React.PropTypes.object,
    status: React.PropTypes.string.isRequired,
    teams: React.PropTypes.array,
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
    const { team, teams, onSaveTeams, onLoadSession } = this.props
    if(prevProps.teams !== teams) {
      if(teams.length === 0) {
        this.context.flash.set('warning', 'Please sign in to your team')
        this.context.router.push({ pathname: '/admin/signin', state: 'fade' })
      } else if(prevProps.status === 'pending') {
        teams.map(team => {
          onLoadSession(team.id, team.token)
        })
      } else {
        const newTeam = teams[teams.length - 1]
        onLoadSession(newTeam.id, newTeam.token)
        onSaveTeams(teams)
      }
    } else if(prevProps.team !== team) {
      onLoadSession(team.id, team.token)
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
