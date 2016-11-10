import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { Provider } from 'react-redux'
import SocketClient from 'socket.io-client'
import CreateStore from './store'
import reducer from './reducer'

class Platform extends React.Component {

  constructor(props) {
    super(props)
    this.socket = SocketClient('', {
      query: 'token=123'
    })
  }

  static childContextTypes = {
    socket: React.PropTypes.object
  }

  render() {
    const store = CreateStore(reducer)
    const { children } = this.props
    return (
      <Provider store={store}>
        <Transition transitionName="expanded" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          { React.cloneElement(children, { key: location.pathname }) }
        </Transition>
      </Provider>
    )
  }

  getChildContext() {
    return {
      socket: this.socket
    }
  }

}

export default Platform
