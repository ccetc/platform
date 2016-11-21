import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import SocketClient from 'socket.io-client'
import localStorage from 'services/local_storage'
import * as actions from './actions'

class Presence extends React.Component {

  static childContextTypes = {
    socket: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
  }

  static propTypes: {
    status: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    user: React.PropTypes.object.isRequired,
    loadToken: React.PropTypes.func.isRequired,
    saveToken: React.PropTypes.func.isRequired,
    signin: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.socket = SocketClient('', {
      query: 'token=123'
    })
    this.state = {
      redirect: '/admin'
    }
  }

  render() {
    const { status, children } = this.props
    if(status === 'initialized') {
      return (
        <Transition transitionName="expanded" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          { React.cloneElement(children, { key: location.pathname }) }
        </Transition>
      )
    } else {
      return <div />
    }
  }

  componentDidMount() {
    this.props.loadToken()
  }

  componentWillReceiveProps(nextProps) {
    const { token, status, user } = nextProps
    if(this.props.status !== status) {
      if(token) {
        this._handleSignin(token)
      } else {
        this._handleSession(token, user)
      }
    }
    if(this.props.user !== user) {
      this._handleSession(token, user)
    }
  }

  getChildContext() {
    return {
      socket: this.socket
    }
  }

  _handleSignin(token) {
    this.props.signin(token)
  }

  _handleSession(token, user) {
    const  { pathname } = this.context.location
    if(pathname !== '/admin/signin') {
      this.setState({ redirect: pathname })
    }
    if(!user) {
      this.context.router.push('/admin/signin')
    } else {
      this._handleToken(token)
    }
  }

  _handleToken(token) {
    const _handleRedirect = this._handleRedirect.bind(this)
    localStorage.setItem('token', token, err => {
      _handleRedirect()
    })
  }

  _handleRedirect() {
    const redirect = this.state.redirect
    this.context.router.push(redirect)
  }

}

const mapStateToProps = (state) => ({
  token: state.token,
  status: state.presence.status,
  user: state.user
})

const mapDispatchToProps = {
  loadToken: actions.loadToken,
  saveToken: actions.saveToken,
  signin: actions.signin
}

export default connect(mapStateToProps, mapDispatchToProps)(Presence)
