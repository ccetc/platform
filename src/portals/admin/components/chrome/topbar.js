import React from 'react'
import { connect } from 'react-redux'
import Search from '../search'
import Account from '../account'
import Notifications from '../notifications/list'
import Navigation from '../navigation'

export class Topbar extends React.Component {

  static contextTypes = {
    drawer: React.PropTypes.object,
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  static propTypes = {
    unread: React.PropTypes.number.isRequired
  }

  render() {
    const { children, unread, user } = this.props
    return (
      <div>
        <div className="chrome-topbar">
          <div className="chrome-topbar-icon" onClick={this._handleOpenNavigation.bind(this)}>
            <i className="sidebar icon" />
          </div>
          <div className="chrome-filler"></div>
          <div className="chrome-topbar-icon" onClick={this._handleOpenSearch.bind(this)}>
            <i className="search icon" />
          </div>
          <div className="chrome-topbar-icon" onClick={this._handleOpenNotifications.bind(this)}>
            <i className="alarm icon" />
            {unread > 0 &&
              <div className="chrome-alerts-label">{unread}</div>
            }
          </div>
          <div className="chrome-topbar-icon" onClick={this._handleOpenAccount.bind(this)}>
            <img src={user.photo} className="ui image circular" />
          </div>
        </div>
        { children }
      </div>
    )
  }

  _handleOpenNavigation() {
    this.context.drawer.open(Navigation, 'left')
  }

  _handleOpenSearch() {
    this.context.modal.open(Search)
  }

  _handleOpenNotifications() {
    this.context.modal.open(Notifications)
  }

  _handleOpenAccount() {
    this.context.drawer.open(Account, 'right')
  }

}

const mapStateToProps = state => ({
  unread: state.notifications.unread,
  user: state.session.user
})

export default connect(mapStateToProps)(Topbar)
