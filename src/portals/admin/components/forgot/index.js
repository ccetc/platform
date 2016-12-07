import React from 'react'
import { connect } from 'react-redux'
import component from 'ui/component'
import { Link } from  'react-router'
import $ from 'jquery'
import * as actions from './actions'

export class Forgot extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    error: React.PropTypes.string,
    status: React.PropTypes.string.isRequired,
    onReset: React.PropTypes.func.isRequired,
    onSetup: React.PropTypes.func.isRequired
  }

  render() {
    const { status } = this.props
    return (
      <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
        <p>Please enter your email address to reset your password.</p>
        <div className="field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input className="form-control" autoComplete="off" placeholder="Email" type="email" ref="email" />
          </div>
        </div>
        <div className="field">
          <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Reset Password</button>
        </div>
        <div className="field">
          <p><Link to={{ pathname: '/admin/signin', state: 'slide-back' }}>Back to Signin</Link></p>
        </div>
      </form>
    )
  }

  componentWillMount() {
    this.props.onSetup()
  }

  componentDidMount() {
    const email = $(this.refs.email)
    setTimeout(function() { email.focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { status, error } = this.props
    if(prevProps.status !== status) {
      if(status == 'success') {
        this.context.flash.set('info', 'Instructions for resetting your password have been emailed to you')
        this.context.router.push({ pathname: '/admin/signin', state: 'slide-back' })
      } else if(status == 'failure') {
        this.context.flash.set('info', error)
      }
    }
  }

  _handleSubmit(event) {
    const { onReset } = this.props
    const email = $(this.refs.email).val()
    onReset(email)
    event.preventDefault()
    return false
  }

}

const mapStateToProps = state => state.forgot

const mapDispatchToProps = {
  onReset: actions.reset,
  onSetup: actions.setup
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Forgot), 'forgot', true)
