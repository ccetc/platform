import React from 'react'
import { connect } from 'react-redux'
import Drawer from './drawer'
import Topbar from './topbar'
import Notifications from './notifications'

export class Chrome extends React.Component {

  static propTypes: {
    active: React.PropTypes.string.isRequired,
    apps: React.PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="chrome">
        <Drawer />
        <div className="chrome-canvas">
          <Topbar />
          <div className="chrome-header">
            <div className="ui breadcrumb">
              <a className="section">Dashboard</a>
              <div className="divider"> / </div>
              <div className="active section">Contacts</div>
            </div>
          </div>
          <div className="chrome-body">
            {this.props.children}
          </div>
          <Notifications />
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  apps: state.chrome.apps,
  active: state.chrome.active
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
