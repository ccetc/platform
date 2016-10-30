import React from 'react'
import { Provider } from 'react-redux'
import SocketClient from 'socket.io-client'
import CreateStore from '../store'
import reducer from '../reducer'
import Chrome from './chrome'

class Platform extends React.Component {

  constructor(props) {
    super(props)
    this.socket = SocketClient()
  }

  static childContextTypes = {
    socket: React.PropTypes.object
  }

  render() {
    const store = CreateStore(reducer)
    return (
      <Provider store={store}>
        <Chrome {...this.props}>
          {this.props.children}
        </Chrome>
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
