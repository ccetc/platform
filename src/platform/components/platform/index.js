import React from 'react'
import { Provider } from 'react-redux'
import SocketClient from 'socket.io-client'
import CreateStore from './store'
import reducer from './reducer'

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
        {this.props.children}
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
