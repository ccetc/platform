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
          {this.props.children}
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
