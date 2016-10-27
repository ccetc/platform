import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Search from './search'

export class Topbar extends React.Component {

  static propTypes: {
    onToggleDrawer: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="chrome-topbar">
        <div className="chrome-toggle" onClick={this._handleToggleDrawer.bind(this)}>
          <i className="sidebar icon" />
        </div>
        <Search />
      </div>
    )
  }

  _handleToggleDrawer() {
    this.props.onToggleDrawer()
  }

}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  onToggleDrawer: actions.toggleDrawer
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
