import React from 'react'
import { connect } from 'react-redux'
import { Link } from  'react-router'
import $ from 'jquery'
import * as actions from './actions'

export class Signin extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object,
    session: React.PropTypes.object
  }

  static propTypes = {
    error: React.PropTypes.string,
    flash: React.PropTypes.string,
    status: React.PropTypes.string.isRequired,
    token: React.PropTypes.string,
    onSignin: React.PropTypes.func.isRequired,
    onSetup: React.PropTypes.func.isRequired
  }

  render() {
    const { flash, status } = this.props
    return (
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
          <p><Link to={{ pathname: '/admin/forgot', state: 'slide-next' }}>Forget your password?</Link></p>
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
    const { error, token, status } = this.props
    if(prevProps.status !== status) {
      if(status === 'success') {
        this.context.session.saveToken(token)
      } else if(status == 'failure') {
        $(this.refs.password).val('')
        this.context.flash.set('info', error)
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

const mapStateToProps = state => state.signin

const mapDispatchToProps = {
  onSignin: actions.signin,
  onSetup: actions.setup
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
