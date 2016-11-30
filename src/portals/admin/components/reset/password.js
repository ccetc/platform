import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as actions from './actions'

class Password extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
    session: React.PropTypes.object
  }

  render() {
    const { status } = this.props
    return (
      <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
        <p>Please enter and confirm your new password.</p>
        <div className="field email-field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input className="form-control" autoComplete="off" placeholder="Password" type="password" ref="password" />
          </div>
        </div>
        <div className="field password-field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input className="form-control" autoComplete="off" placeholder="Confirm Password" type="password" ref="confirm" />
          </div>
        </div>
        <div className="field">
          <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Reset Password</button>
        </div>
      </form>
    )
  }

  componentDidMount() {
    const password = $(this.refs.password)
    setTimeout(function() { password.focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { session } = this.context
    const { error, status, token} = this.props
    if(prevProps.status != status) {
      if(status === 'complete') {
        session.saveToken(token)
        session.setFlash('success', 'Your password was successfully reset')
      } else if(status == 'failed') {
        session.setFlash('info', error)
      }
    }
  }

  _handleSubmit(event) {
    const { onReset, token } = this.props
    const password = $(this.refs.password).val()
    const confirm = $(this.refs.confirm).val()
    onReset(token, password, confirm)
    event.preventDefault()
    return false
  }

}

const mapStateToProps = state => state.reset

const mapDispatchToProps = {
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
