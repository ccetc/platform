import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Search from './search'

export class Topbar extends React.Component {

  static propTypes: {
    unread: React.PropTypes.number.isRequired,
    onToggleDrawer: React.PropTypes.func.isRequired
  }

  render() {
    const { unread } = this.props
    return (
      <div className="chrome-topbar">
        <div className="chrome-toggle" onClick={this._handleToggleDrawer.bind(this)}>
          <i className="sidebar icon" />
        </div>
        <Search />
          <div className="chrome-alerts">
            <i className="warning sign icon" />
            {unread > 0 &&
              <div className="chrome-alerts-label">{unread}</div>
            }
          </div>
      </div>
    )
  }

  _handleToggleDrawer() {
    this.props.onToggleDrawer()
  }

}

const mapStateToProps = (state) => ({
  unread: state.chrome.notifications.unread
})

const mapDispatchToProps = {
  onToggleDrawer: actions.toggleDrawer
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
