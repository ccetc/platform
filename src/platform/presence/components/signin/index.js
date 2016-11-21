import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import $ from 'jquery'
import * as actions from './actions'

export class Signin extends React.Component {

  static propTypes: {
    flash: React.PropTypes.object.isRequired,
    status: React.PropTypes.string.isRequired,
    onSignin: React.PropTypes.func.isRequired
  }

  render() {
    const { flash, status } = this.props
    return (
      <div className="chrome-signin">
        <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
          {flash !== null &&
            <div className={`chrome-flash ${flash.style}`}>
              {flash.message}
            </div>
          }
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon"></i>
              <input className="form-control" autoComplete="off" placeholder="Email" type="email" ref="email" />
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="lock icon"></i>
              <input className="form-control" autoComplete="off" placeholder="Password" type="password" ref="password" />
            </div>
          </div>
          <div className="field">
            <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Signin</button>
          </div>
          <div className="field">
            <p><Link to="/admin/reset">Forget your password?</Link></p>
          </div>
        </form>
      </div>
    )
  }

  componentDidMount() {
    const email = $(this.refs.email)
    setTimeout(function() { email.focus() }, 500)
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
  status: state.signin.status,
  flash: state.flash
})

const mapDispatchToProps = {
  onSignin: actions.signin
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
