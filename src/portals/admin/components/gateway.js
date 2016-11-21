import React from 'react'
import Transition from 'react-addons-css-transition-group'

export class Gateway extends React.Component {

  render() {
    const { children, location } = this.props
    return (
      <Transition transitionName="expanded" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        { React.cloneElement(children, { key: location.pathname }) }
      </Transition>
    )
  }

}

export default Gateway
