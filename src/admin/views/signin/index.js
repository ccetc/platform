import React from 'react'
import Logo from 'admin/components/logo'
import Avatar from 'admin/components/avatar'
import { getActiveTeam } from 'admin/components/admin/selectors'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import $ from 'jquery'
import _ from 'lodash'
import * as actions from './actions'

class Signin extends React.Component {

  static contextTypes = {
    admin: React.PropTypes.object,
    flash: React.PropTypes.object,
    router: React.PropTypes.object
  }

  render() {
    const { active, mode, show, status, teams, team, user } = this.props
    return (
      <div className={`chrome-signin chrome-signin-${mode}`}>
        <div className="chrome-signin-canvas">
          <div className="chrome-signin-header">
            <div className="chrome-signin-content">
              <h1>Sign in To Your Team</h1>
            </div>
          </div>
          <div className="chrome-signin-form">
            <form className="ui form" onSubmit={this._handleTeam.bind(this)}>
              <div className="field team-field">
                <div className="ui left icon input">
                  <i className="users icon"></i>
                  <input className="form-control" autoFocus autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="team" type="text" ref="team" />
                  <div className="suffix">.{ PLATFORM_DOMAIN }</div>
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>Continue <i className="right chevron icon" /></button>
              </div>
            </form>
          </div>
          <div className="chrome-signin-footer">
            <div className="chrome-signin-content">
              { active && <p><Link to={{ pathname: '/admin' }}>Back to { active.subdomain }</Link></p> }
            </div>
          </div>
        </div>
        <div className="chrome-signin-canvas">
          <div className="chrome-signin-header">
            <div className="chrome-signin-content">
              { team && <Logo team={team} width="150" /> }
              { team && <h1>{ team.title }</h1> }
            </div>
          </div>
          <div className="chrome-signin-form">
            <form className="ui form" onSubmit={this._handleEmail.bind(this)}>
              <div className="field email-field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input className="form-control" autoFocus autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Email" type="email" ref="email" />
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>Continue <i className="right chevron icon" /></button>
              </div>
            </form>
          </div>
          <div className="chrome-signin-footer">
            <div className="chrome-signin-content">
              <p><a onClick={ this._handleChangeMode.bind(this, 'team') }>Wrong team?</a></p>
              { team && _.includes(team.strategies, 'cornell') && <p><a href="/admin/signin/cornell">Signin with CUWebAuth</a></p> }
              { team && _.includes(team.strategies, 'google') && <p><a href="/admin/signin/google">Signin with Google</a></p> }
            </div>
          </div>
        </div>
        <div className="chrome-signin-canvas">
          <div className="chrome-signin-header">
            <div className="chrome-signin-content">
              { user && <Avatar user={ user } width="150" /> }
              { user && <h1>{ user.full_name }</h1> }
              { user && <h4>{ user.email }</h4> }
            </div>
          </div>
          <div className="chrome-signin-form">
            <form className="ui form" onSubmit={this._handlePassword.bind(this)}>
              <div className="field password-field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input className="form-control" autoFocus autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Password" type={ show ? 'text' : 'password' } ref="password" />
                  <a onClick={ this._handleTogglePassword.bind(this) }>{ show ? 'HIDE' : 'SHOW' }</a>
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status === 'submitting') ? 'loading' : ''} button`}>Signin</button>
              </div>
            </form>
          </div>
          <div className="chrome-signin-footer">
            <div className="chrome-signin-content">
              <p><a onClick={ this._handleChangeMode.bind(this, 'email') }>Not you?</a></p>
              <p><a onClick={ this._handleForgot.bind(this) }>Forgot your password?</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { error, status, team, token, onReset } = this.props
    const { admin, flash, router } = this.context
    if(token) {
      admin.addTeam(team, token)
      onReset()
      router.push({ pathname: '/admin', state: 'fade' })
    } else if(prevProps.status !== status) {
      if(status === 'failure') {
        flash.set('info', error)
      }
    }
  }

  _handleChangeMode(mode) {
    this.props.onChangeMode(mode)
  }

  _handleTeam(e) {
    $(this.refs.email).click().focus()
    const { teams, onTeam } = this.props
    const subdomain = $(this.refs.team).val()
    const index = _.findIndex(teams, { subdomain })
    if(index >= 0) {
      this.context.admin.chooseTeam(index)
      this.context.router.push({ pathname: '/admin', state: 'fade' })
    } else {
      onTeam(subdomain)
    }
    e.preventDefault()
    return false
  }

  _handleEmail(e) {
    $(this.refs.password).click().focus()
    const { team, onEmail } = this.props
    const email = $(this.refs.email).val()
    onEmail(team.id, email)
    e.preventDefault()
    return false
  }

  _handlePassword(e) {
    $(this.refs.password).click().focus()
    const { team, user, onPassword } = this.props
    const password = $(this.refs.password).val()
    onPassword(team.id, user.email, password)
    e.preventDefault()
    return false
  }

  _handleTogglePassword() {
    $(this.refs.password).click().focus()
    this.props.onTogglePassword()
  }

  _handleForgot() {
    const { team, user, onForgot } = this.props
    onForgot(team.id, user.email)
  }

}
const mapStateToProps = state => ({
  active: getActiveTeam(state),
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
  onChangeMode: actions.changeMode,
  onTeam: actions.team,
  onEmail: actions.email,
  onPassword: actions.password,
  onTogglePassword: actions.togglePassword,
  onForgot: actions.forgot,
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
