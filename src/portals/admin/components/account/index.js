import React from 'react'
import { connect } from 'react-redux'
import Edit from './edit'
import Password from './password'

export class Account extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object,
    session: React.PropTypes.object
  }

  render() {
    const { user } = this.props
    return (
      <div className="chrome-account-panel">
        <div className="chrome-account-identity">
          <img src={user.photo} className="ui image circular" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="chrome-account-tasks">
          <div className="chrome-account-task" onClick={this._handleModal.bind(this, Edit)}>
            <i className="edit icon" /> Edit Account
          </div>
          <div className="chrome-account-task" onClick={this._handleModal.bind(this, Password)}>
            <i className="lock icon" /> Change Password
          </div>
          <div className="chrome-account-task" onClick={this._handleSignout.bind(this)}>
            <i className="power icon" /> Sign Out
          </div>
        </div>
      </div>
    )
  }

  _handleModal(component) {
    this.context.chrome.closeDrawer()
    this.context.chrome.openModal(component)
  }

  _handleSignout() {
    this.context.chrome.closeDrawer()
    this.context.session.signout()
  }

}

const mapStateToProps = state => ({
  ...state.chrome.account,
  user: state.session.user
})

export default connect(mapStateToProps)(Account)
