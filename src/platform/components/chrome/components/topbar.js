import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as sessionActions from '../../session/actions'
import Search from './search'

export class Topbar extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes: {
    unread: React.PropTypes.number.isRequired,
    onToggleDrawer: React.PropTypes.func.isRequired,
    onSignout: React.PropTypes.func.isRequired
  }

  render() {
    const { unread } = this.props
    return (
      <div className="chrome-topbar">
        <div className="chrome-toggle" onClick={this._handleToggleDrawer.bind(this)}>
          <i className="sidebar icon" />
        </div>
        <Search />
        <Link to="/admin/notifications" className="chrome-alerts">
          <i className="warning sign icon" />
          {unread > 0 &&
            <div className="chrome-alerts-label">{unread}</div>
          }
        </Link>
        <div className="chrome-power" onClick={this._handleSignout.bind(this)}>
          <i className="power icon" />
        </div>
      </div>
    )
  }

  _handleToggleDrawer() {
    this.props.onToggleDrawer()
  }

  _handleSignout() {
    this.context.router.push('/admin/signin')
    this.props.onSignout()
  }

}

const mapStateToProps = (state) => ({
  unread: state.chrome.notifications.unread
})

const mapDispatchToProps = {
  onToggleDrawer: actions.toggleDrawer,
  onSignout: sessionActions.signout
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
