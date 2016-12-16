import React from 'react'
import SocketClient from 'socket.io-client'
import component from 'portals/admin/components/component'
import * as actions from './actions'

class Socket extends React.Component {

  static childContextTypes = {
    socket: React.PropTypes.object
  }

  static propTypes = {
  }

  render() {
    return this.props.children
  }

  componentDidMount() {
    this.socket = SocketClient()
  }

  getChildContext() {
    return {
      socket: this.socket
    }
  }

}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default component(mapStateToProps, mapDispatchToProps, Socket, 'socket', true)
