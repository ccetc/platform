import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as drawerActions from '../drawer/actions'
import Search from '../search'

export class Topbar extends React.Component {

  static propTypes: {
    unread: React.PropTypes.number.isRequired,
    onToggle: React.PropTypes.func.isRequired
  }

  render() {
    const { unread } = this.props
    return (
      <div className="chrome-topbar">
        <div className="chrome-toggle" onClick={this._handleToggle.bind(this)}>
          <i className="sidebar icon" />
        </div>
        <Search />
        <Link to="/admin/notifications" className="chrome-alerts">
          <i className="warning sign icon" />
          {unread > 0 &&
            <div className="chrome-alerts-label">{unread}</div>
          }
        </Link>
      </div>
    )
  }

  _handleToggle() {
    this.props.onToggle()
  }

}

const mapStateToProps = (state) => ({
  unread: state.notifications.unread
})

const mapDispatchToProps = {
  onToggle: drawerActions.toggle
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
