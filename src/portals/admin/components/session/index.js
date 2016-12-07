import React from 'react'
import { connect } from 'react-redux'
import component from 'ui/component'
import _ from 'lodash'
import * as actions from './actions'

class Session extends React.Component {

  static childContextTypes = {
    socket: React.PropTypes.object,
    session: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object,
    flash: React.PropTypes.object
  }

  static propTypes = {
    token: React.PropTypes.string,
    user: React.PropTypes.object,
    loadToken: React.PropTypes.func.isRequired,
    saveToken: React.PropTypes.func.isRequired,
    signin: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      redirect: '/admin',
      socket: null
    }
  }

  render() {
    const { children, status } = this.props
    return status !== 'pending' ? children : null
  }

  componentDidMount() {
    if(!this._isExternalRoute()) {
      this.setState({ redirect: this.props.location.pathname })
    }
    this.props.loadToken()
  }

  componentWillReceiveProps(nextProps) {
    const { token, status, user } = nextProps
    if(this.props.status !== status) {
      if(status === 'initialized') {
        if(token) {
          this.props.signin(token)
        } else if (!this._isExternalRoute()) {
          this.context.flash.set('info', 'You must first signin to access this resource.')
          this.context.router.push('/admin/signin')
        }
      } else if(status === 'failure') {
        this.props.signout()
      } else if(status == 'active') {
        this.props.loadSession(token)
      } else if(status === 'signed_out') {
        this.context.flash.set('info', 'You have been successfully signed out.')
        this.context.router.push('/admin/signin')
      }
    }
    if(this.props.user !== user && user) {
      const redirect = this.state.redirect
      this.setState({ redirect: '/admin' })
      this.context.router.push(redirect)
    }
  }

  getChildContext() {
    const { signout, saveToken } = this.props
    return {
      socket: this.socket,
      session: {
        saveToken,
        signout
      }
    }
  }

  _isExternalRoute() {
    const { location } = this.props
    const parts = location.pathname.split('/')
    const context = (parts.length > 2) ? parts[2] : null
    return _.includes(['signin','forgot','reset','activation'], context)
  }

}

const mapStateToProps = state => ({
  status: state.session.status,
  token: state.session.token,
  user: state.session.user
})

const mapDispatchToProps = {
  loadToken: actions.loadToken,
  saveToken: actions.saveToken,
  signin: actions.signin,
  signout: actions.signout,
  loadSession: actions.loadSession
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Session), 'session', true)
