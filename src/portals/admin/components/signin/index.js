import React from 'react'
import { connect } from 'react-redux'
import { Link } from  'react-router'
import $ from 'jquery'
import * as actions from './actions'
import * as sessionActions from '../session/actions'

export class Signin extends React.Component {

  static propTypes: {
    flash: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    onSaveToken: React.PropTypes.func.isRequired,
    onSignin: React.PropTypes.func.isRequired,
    onSetup: React.PropTypes.func.isRequired
  }

  render() {
    const { flash, status } = this.props
    return (
      <div className="chrome-session chrome-signin">
        <div className="chrome-session-widget">
          <h1>MyCCE</h1>
          <h3>Cornell Cooperative Extension of Tompkins County</h3>
          <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
            {flash &&
              <div className={`chrome-flash ${flash.style}`}>
                {flash.message}
              </div>
            }
            <div className="field email-field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input className="form-control" autoComplete="off" placeholder="Email" type="email" ref="email" />
              </div>
            </div>
            <div className="field password-field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input className="form-control" autoComplete="off" placeholder="Password" type="password" ref="password" />
              </div>
            </div>
            <div className="field">
              <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Signin</button>
            </div>
            <div className="field">
              <p><Link to="/admin/forgot">Forget your password?</Link></p>
            </div>
          </form>
        </div>
      </div>
    )
  }

  componentWillMount() {
    this.props.onSetup()
  }

  componentDidMount() {
    const email = $(this.refs.email)
    setTimeout(function() { email.focus() }, 500)
  }

  componentWillReceiveProps(nextProps) {
    const { token, status } = nextProps
    if(this.props.status !== status) {
      if(status === 'success') {
        this.props.onSaveToken(token)
      } else if(status === 'failure') {
        $(this.refs.password).val('')
      }
    }
  }

  _handleSubmit(event) {
    const { onSignin } = this.props
    const email = $(this.refs.email).val()
    const password = $(this.refs.password).val()
    onSignin(email, password)
    event.preventDefault()
    return false
  }

}

const mapStateToProps = (state) => ({
  flash: state.signin.flash,
  status: state.signin.status,
  token: state.signin.token
})

const mapDispatchToProps = {
  onSignin: actions.signin,
  onSaveToken: sessionActions.saveToken,
  onSetup: actions.setup
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
