import React from 'react'
import { connect } from 'react-redux'
import Edit from './edit'
import Password from './password'

export class Account extends React.Component {

  static contextTypes = {
    drawer: React.PropTypes.object,
    modal: React.PropTypes.object,
    router: React.PropTypes.object,
    teams: React.PropTypes.object,
    session: React.PropTypes.object
  }

  static propTypes = {
    active: React.PropTypes.number,
    team: React.PropTypes.array,
    user: React.PropTypes.object
  }

  render() {
    const { active, teams, user } = this.props
    const team = teams[active]
    return (
      <div className="chrome-account-panel">
        <div className="chrome-account-identity">
          <img src={user.photo} className="ui image circular" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="chrome-account-tasks">
          <div className="chrome-account-task" onClick={this._handleModal.bind(this, Edit)}>
            <i className="write icon" /> Edit Account
          </div>
          <div className="chrome-account-task" onClick={this._handleModal.bind(this, Password)}>
            <i className="lock icon" /> Change Password
          </div>
          <div className="chrome-account-task" onClick={this._handleSignin.bind(this)}>
            <i className="key icon" /> Sign in to another team
          </div>
          <div className="chrome-account-task" onClick={this._handleSignout.bind(this, active)}>
            <i className="power icon" /> Sign Out of <strong>{team.subdomain}.mycce.com</strong>
          </div>
        </div>
      </div>
    )
  }

  _handleModal(component) {
    this.context.drawer.close()
    this.context.modal.open(component)
  }

  _handleSignin() {
    this.context.drawer.close()
    this.context.router.push({ pathname: '/admin/signin' })
  }

  _handleSignout(index) {
    this.context.drawer.close()
    this.context.teams.remove(index)
  }

  _handleCloseDrawer() {
    this.context.drawer.close()
  }

}

const mapStateToProps = state => ({
  active: state.teams.active,
  user: state.session.user,
  teams: state.teams.teams
})

export default connect(mapStateToProps)(Account)
