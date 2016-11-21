import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

class Session extends React.Component {

  static childContextTypes = {
    socket: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object
  }

  static propTypes: {
    token: React.PropTypes.string.isRequired,
    user: React.PropTypes.object.isRequired,
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
    return (
      <div>
        { status !== 'pending' ? children : null }
      </div>
    )
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
      if(status == 'initialized') {
        if(token) {
          this.props.signin(token)
        } else if (!this._isExternalRoute()) {
          this.context.router.push('/admin/signin')
        }
      } else if(status == 'failed') {
        this.props.signout()
      } else if(status == 'active') {
        this.props.loadSession(token)
      }
    }
    if(this.props.user !== user) {
      if(user) {
        const redirect = this.state.redirect
        this.setState({ redirect: '/admin' })
        this.context.router.push(redirect)
      }
    }
  }

  getChildContext() {
    return {
      socket: this.socket
    }
  }

  _isExternalRoute() {
    const parts = this.props.location.pathname.split('/')
    const context = (parts.length > 2) ? parts[2] : null
    return _.includes(['signin','forgot','reset','activation'], context)
  }

}

const mapStateToProps = (state) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Session)
