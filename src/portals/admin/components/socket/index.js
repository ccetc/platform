import React from 'react'
import SocketClient from 'socket.io-client'
import { connect } from 'react-redux'
import component from 'ui/component'
import * as actions from './actions'

class Socket extends React.Component {

  static childContextTypes = {
    socket: React.PropTypes.object
  }

  static propTypes = {
  }

  render() {
    const { children } = this.props
    return <div>{ children }</div>
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

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Socket), 'socket', true)
