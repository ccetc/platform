import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from '../chrome/actions'

export class Account extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object,
    session: React.PropTypes.object
  }

  render() {
    const { expanded, user } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
        {expanded && <div className="chrome-account-overlay" onClick={this._handleToggleAccount.bind(this)} />}
        {expanded &&
          <div className="chrome-account-panel">
            <div className="chrome-account-identity">
              <img src={user.photo} className="ui image circular" />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <div className="chrome-account-tasks">
              <div className="chrome-account-task">
                <i className="edit icon" /> Edit Account
              </div>
              <div className="chrome-account-task">
                <i className="lock icon" /> Change Password
              </div>
              <div className="chrome-account-task" onClick={this._handleSignout.bind(this)}>
                <i className="power icon" /> Sign Out
              </div>
            </div>
          </div>
        }
      </Transition>
    )
  }

  _handleToggleAccount() {
    this.props.onToggleAccount()
  }

  _handleSignout() {
    this.props.onToggleAccount()
    this.context.session.signout()
  }

}

const mapStateToProps = state => ({
  ...state.chrome.account,
  user: state.session.user
})

const mapDispatchToProps = {
  onToggleAccount: actions.toggleAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
