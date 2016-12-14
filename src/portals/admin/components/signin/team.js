import React from 'react'
import _ from 'lodash'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Team extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object,
    router: React.PropTypes.object,
    teams: React.PropTypes.object
  }

  static propTypes = {
    error: React.PropTypes.string,
    status: React.PropTypes.string,
    teams: React.PropTypes.array,
    onTeam: React.PropTypes.func
  }

  render() {
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <div className="chrome-signin">
            <h1>Sign in To Your Team</h1>
            <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
              <div className="field team-field">
                <div className="ui left icon input">
                  <i className="users icon"></i>
                  <input className="form-control" autoComplete="off" placeholder="team" type="text" ref="subdomain" />
                  <div className="suffix">.mycce.com</div>
                </div>
              </div>
              <div className="field button-field">
                <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Continue <i className="right chevron icon" /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const subdomain = $(this.refs.subdomain)
    setTimeout(function() { subdomain.focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { error, status } = this.props
    if(prevProps.status !== status) {
      if(status === 'failure') {
        this.context.flash.set('info', error)
      } else if(status === 'success') {
        this.context.router.push({ pathname: '/admin/signin/email', state: 'next' })
      }
    }
  }

  _handleSubmit(event) {
    const { teams, onTeam } = this.props
    const subdomain = $(this.refs.subdomain).val()
    const index = _.findIndex(teams, { subdomain })
    if(index >= 0) {
      this.context.teams.choose(index)
      this.context.router.push({ pathname: '/admin' })
    } else {
      onTeam(subdomain)
    }
    event.preventDefault()
    return false
  }

}

const mapStateToProps = state => ({
  error: state.signin.error,
  status: state.signin.status,
  teams: state.teams.teams
})

const mapDispatchToProps = {
  onTeam: actions.team
}

export default connect(mapStateToProps, mapDispatchToProps)(Team)
