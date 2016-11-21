import React from 'react'
import Flash from '../flash'
import Drawer from '../drawer'
import Topbar from './topbar'
import Notifications from '../notifications'

export class Chrome extends React.Component {

  render() {
    return (
      <div className="chrome">
        <Flash />
        <Drawer />
        <Topbar />
        {this.props.children}
      </div>
    )
  }

}

export default Chrome
