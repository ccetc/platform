import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Topbar extends React.Component {

  static propTypes: {
    unread: React.PropTypes.number.isRequired,
    onToggle: React.PropTypes.func.isRequired
  }

  render() {
    const { unread } = this.props
    return (
      <div className="chrome-topbar">
        <div className="chrome-toggle" onClick={this._handleToggleDrawer.bind(this)}>
          <i className="sidebar icon" />
        </div>
        <div className="chrome-filler"></div>
        <div className="chrome-search" onClick={this._handleToggleSearch.bind(this)}>
          <i className="search icon" />
        </div>
        <Link to="/admin/notifications" className="chrome-alerts">
          <i className="alarm icon" />
          {unread > 0 &&
            <div className="chrome-alerts-label">{unread}</div>
          }
        </Link>
        <div className="chrome-account" onClick={this._handleToggleAccount.bind(this)}>
          <img src="/images/greg.jpg" className="ui image circular" />
        </div>
      </div>
    )
  }

  _handleToggleDrawer() {
    this.props.onToggleDrawer()
  }

  _handleToggleSearch() {
    this.props.onBeginSearch()
  }

  _handleToggleAccount() {
    this.props.onToggleAccount()
  }

}

const mapStateToProps = (state) => ({
  unread: state.notifications.unread
})

const mapDispatchToProps = {
  onToggleAccount: actions.toggleAccount,
  onToggleDrawer: actions.toggleDrawer,
  onBeginSearch: actions.beginSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
