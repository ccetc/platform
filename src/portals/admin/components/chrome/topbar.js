import React from 'react'
import { connect } from 'react-redux'
import Search from './search'
import Account from '../account'
import Notifications from './notifications'
import Navigation from './navigation'

export class Topbar extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object
  }

  static propTypes = {
    unread: React.PropTypes.number.isRequired
  }

  render() {
    const { unread } = this.props
    return (
      <div className="chrome-topbar">
        <div className="chrome-navigation" onClick={this._handleOpenNavigation.bind(this)}>
          <i className="sidebar icon" />
        </div>
        <div className="chrome-filler"></div>
        <div className="chrome-search" onClick={this._handleOpenSearch.bind(this)}>
          <i className="search icon" />
        </div>
        <div className="chrome-alerts" onClick={this._handleOpenNotifications.bind(this)}>
          <i className="alarm icon" />
          {unread > 0 &&
            <div className="chrome-alerts-label">{unread}</div>
          }
        </div>
        <div className="chrome-account" onClick={this._handleOpenAccount.bind(this)}>
          <img src="/images/greg.jpg" className="ui image circular" />
        </div>
      </div>
    )
  }

  _handleOpenNavigation() {
    this.context.chrome.openDrawer(Navigation, 'left')
  }

  _handleOpenSearch() {
    this.context.chrome.openModal(Search)
  }

  _handleOpenNotifications() {
    this.context.chrome.openModal(Notifications)
  }

  _handleOpenAccount() {
    this.context.chrome.openDrawer(Account, 'right')
  }

}

const mapStateToProps = (state) => ({
  unread: state.notifications.unread
})

export default connect(mapStateToProps)(Topbar)
