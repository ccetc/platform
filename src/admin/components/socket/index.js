import React from 'react'
import SocketClient from 'socket.io-client'
import { connect } from 'react-redux'
import _ from 'lodash'

class Socket extends React.Component {

  static childContextTypes = {
    socket: React.PropTypes.object
  }

  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.rooms = []
  }

  render() {
    return this.props.children
  }

  componentDidMount() {
    this.socket = SocketClient()
  }

  getChildContext() {
    return {
      socket: {
        join: this._join.bind(this),
        leave: this._leave.bind(this),
        leaveAll: this._leaveAll.bind(this)
      }
    }
  }

  _join(room, handlers, token) {
    if(_.includes(this.rooms)) return false
    this.socket.emit('join', { token, room })
    this.socket.on('join', (data) => {
      if(!data.success) return false
      if(data.room !== room) return false
      this.rooms = this.rooms.push(room)
      Object.keys(handlers).map(action => {
        this.socket.on(action, handlers[action])
      })
    })

  }

  _leave(room) {
    if(!_.includes(this.rooms)) return false
    this.socket.emit('leave', { room }, (data) => {
      if(!data) return false
      this.rooms = _.without(this, room)
    })
  }

  _leaveAll() {
    this.rooms.map(room => {
      this._leave(room)
    })
  }

}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Socket)
