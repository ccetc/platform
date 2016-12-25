import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import $ from 'jquery'
import _ from 'lodash'
import * as actions from './actions'
import { getActiveTeam } from '../../containers/admin/selectors'

class Signin extends React.Component {

  render() {
    const { mode, show, team, user } = this.props
    console.log(team)
    return (
      <div className={`chrome-signin chrome-signin-${mode}`}>
        <div className="chrome-signin-canvas">
          <div className="chrome-signin-form">
            <h1>Sign in To Your Team</h1>
            <form className="ui form" onSubmit={this._handleTeam.bind(this)}>
              <div className="field team-field">
                <div className="ui left icon input">
                  <i className="users icon"></i>
                  <input className="form-control" autoComplete="off" placeholder="team" type="text" ref="team" />
                  <div className="suffix">.mycce.com</div>
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Continue <i className="right chevron icon" /></button>
                { team && <p><Link to={{ pathname: '/admin', state: 'slide-back' }}>Back to { team.title }</Link></p> }
              </div>
            </form>
          </div>
        </div>
        <div className="chrome-signin-canvas">
          <div className="chrome-signin-form">
            { team && <img src={ team.logo } className="logo" /> }
            { team && <h1>{ team.title }</h1> }
            <form className="ui form" onSubmit={this._handleEmail.bind(this)}>
              <div className="field email-field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input className="form-control" autoComplete="off" placeholder="Email" type="email" ref="email" />
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Continue <i className="right chevron icon" /></button>
                  <p><Link to={{ pathname: '/admin/signin', state: 'slide-back' }}>Wrong team?</Link></p>
                  { team && _.includes(team.strategies, 'cornell') && <p><a href="/admin/signin/cornell">Signin with CUWebAuth</a></p> }
                  { team && _.includes(team.strategies, 'google') && <p><a href="/admin/signin/google">Signin with Google</a></p> }
              </div>
            </form>
          </div>
        </div>
        <div className="chrome-signin-canvas">
          <div className="chrome-signin-form">
            { user && <img src={ user.photo } className="photo" /> }
            { user && <h1>{ user.full_name }</h1> }
            { user && <h4>{ user.email }</h4> }
            <form className="ui form" onSubmit={this._handlePassword.bind(this)}>
              <div className="field password-field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input className="form-control" autoComplete="off" placeholder="Password" type={ show ? 'text' : 'password' } ref="password" />
                  <a onClick={ this._handleTogglePassword.bind(this) }>{ show ? 'HIDE' : 'SHOW' }</a>
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Signin</button>
              </div>
            </form>
            <p><Link to={{ pathname: '/admin/signin/email', state: 'slide-back' }}>Not you?</Link></p>
            <p><a onClick={ this._handleForgot.bind(this) }>Forgot your password?</a></p>
          </div>
        </div>
      </div>
    )
  }

  _handleTeam(e) {
    $(this.refs.subdomain).click().focus()
    const { teams, onTeam } = this.props
    const subdomain = $(this.refs.team).val()
    const index = _.findIndex(teams, { subdomain })
    if(index >= 0) {
      this.context.admin.chooseTeam(index)
      this.context.router.push({ pathname: '/admin', state: 'fade' })
    } else {
      onTeam(subdomain)
      $(this.refs.email).click().focus()
    }
    e.preventDefault()
    return false
  }

  _handleEmail(e) {
    const { team, onEmail } = this.props
    const email = $(this.refs.email).val()
    onEmail(team.id, email)
    $(this.refs.password).click().focus()
    e.preventDefault()
    return false
  }

  _handlePassword(e) {
    const { team, user, onPassword } = this.props
    const password = $(this.refs.password).val()
    onPassword(team.id, user.email, password)
    e.preventDefault()
    return false
  }

  _handleTogglePassword() {
    this.props.onTogglePassword()
  }

  _handleForgot() {
    const { team, user, onForgot } = this.props
    onForgot(team.id, user.email)
  }

}
const mapStateToProps = state => ({
  error: state.signin.error,
  mode: state.signin.mode,
  show: state.signin.show,
  status: state.signin.status,
  teams: state.admin.teams,
  team: state.signin.team,
  token: state.signin.token,
  user: state.signin.user
})

const mapDispatchToProps = {
  onTeam: actions.team,
  onEmail: actions.email,
  onPassword: actions.password,
  onTogglePassword: actions.togglePassword,
  onForgot: actions.forgot
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
