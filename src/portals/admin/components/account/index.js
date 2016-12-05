import React from 'react'
import { connect } from 'react-redux'
import Edit from './edit'
import Password from './password'

export class Account extends React.Component {

  static contextTypes = {
    drawer: React.PropTypes.object,
    modal: React.PropTypes.object,
    session: React.PropTypes.object
  }

  render() {
    const { user } = this.props
    return (
      <div className="chrome-account-panel">
        <div className="chrome-account-identity">
          <div className="chrome-account-close">
            <i className="remove icon" onClick={this._handleCloseDrawer.bind(this)} />
          </div>
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
          <div className="chrome-account-task" onClick={this._handleSignout.bind(this)}>
            <i className="power icon" /> Sign Out
          </div>
        </div>
      </div>
    )
  }

  _handleModal(component) {
    this.context.drawer.close()
    this.context.modal.open(component)
  }

  _handleSignout() {
    this.context.drawer.close()
    this.context.session.signout()
  }

  _handleCloseDrawer() {
    this.context.drawer.close()
  }

}

const mapStateToProps = state => ({
  user: state.session.user
})

export default connect(mapStateToProps)(Account)
