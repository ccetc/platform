import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Teams extends React.Component {

  static childContextTypes = {
    admin: React.PropTypes.object
  }

  static propTypes = {
    status: React.PropTypes.string,
    onChooseTeam: React.PropTypes.func,
    onLoadTeam: React.PropTypes.func,
    onSaveTeam: React.PropTypes.func
  }

  render() {
    const { children, status } = this.props
    return (
      <div>
        { (status === 'success') ? children : null }
      </div>
    )
  }

  componentDidMount() {
    this.props.onLoadTeams()
  }

  componentDidUpdate(prevProps) {
    const { active, teams } = this.props
    if(prevProps.teams !== teams && prevProps.status !== 'pending') {
      this.props.onSaveTeams(teams)
    }
    if(prevProps.active !== active) {
      const team = teams[active]
      this.props.onLoadSession(team.id, team.token)
    }
  }

  getChildContext() {
    return {
      admin: {
        addTeam: this._handleAddTeam.bind(this),
        chooseTeam: this._handleChooseTeam.bind(this),
        removeTeam: this._handleRemoveTeam.bind(this)
      }
    }
  }

  _handleAddTeam(team, token) {
    this.props.addTeam(team, token)
  }

  _handleChooseTeam(index) {
    this.props.chooseTeam(index)
  }

  _handleRemoveTeam(index) {
    this.props.removeTeam(index)
  }

}

const mapStateToProps = state => ({
  active: state.admin.active,
  teams: state.admin.teams,
  status: state.admin.status
})

const mapDispatchToProps = {
  addTeam: actions.addTeam,
  chooseTeam: actions.chooseTeam,
  removeTeam: actions.removeTeam,
  onLoadTeams: actions.loadTeams,
  onLoadSession: actions.loadSession,
  onSaveTeams: actions.saveTeams
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)
