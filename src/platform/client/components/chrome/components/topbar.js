import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Topbar extends React.Component {

  static propTypes: {
    onToggleSidebar: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="chrome-topbar">
        <div className="chrome-overlay" onClick={this._handleToggleDrawer.bind(this)} />
        <div className="chrome-toggle" onClick={this._handleToggleDrawer.bind(this)}>
          <i className="sidebar icon" />
        </div>
        <div className="chrome-search">
          <i className="search icon" />
          <div className="ui input">
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
    )
  }

  _handleToggleDrawer() {
    this.props.onToggleDrawer()
  }

}

const mapStateToProps = (state) => ({
  expanded: state.chrome.expanded
})

const mapDispatchToProps = {
  onToggleDrawer: actions.toggleDrawer
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
