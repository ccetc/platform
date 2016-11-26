import React from 'react'
import Transition from 'react-addons-css-transition-group'
import Flash from '../flash'
import Drawer from '../drawer'
import Topbar from './topbar'
import Notifications from '../notifications'

export class Chrome extends React.Component {

  render() {
    const { location, children } = this.props
    const transitionName = location.state || 'next'
    return (
      <div className="chrome">
        <Flash />
        <Drawer />
        <Topbar />
        <Transition component="div" transitionName={ transitionName } transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          { React.cloneElement(children, { key: location.pathname }) }
        </Transition>
      </div>
    )
  }

}

export default Chrome
