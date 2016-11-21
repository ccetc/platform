import React from 'react'
import Flash from './components/flash'
import Drawer from './components/drawer'
import Topbar from './components/topbar'
import Notifications from '../notifications'

export class Chrome extends React.Component {

  render() {
    return (
      <div className="chrome">
        <Flash />
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

export default Chrome
