import React from 'react'
import Transition from 'react-addons-css-transition-group'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Signin extends React.Component {

  static propTypes: {
    mode: React.PropTypes.string.isRequired,
    flash: React.PropTypes.object.isRequired,
    onChangeMode: React.PropTypes.func.isRequired,
    onClearFlash: React.PropTypes.func.isRequired,
    onSetFlash: React.PropTypes.func.isRequired,
    onSignin: React.PropTypes.func.isRequired
  }

  render() {
    const { mode, flash} = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        { mode == 'signin' &&
          <div className="chrome-signin-canvas">
            <div className="chrome-signin">
              <h1>MyCCE</h1>
              <h3>Cornell Cooperative Extension of Tompkins County</h3>
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
                  <button className="ui fluid large submit red button">Sign In</button>
                </div>
                <div className="field">
                  <p><a onClick={this._handleChangeMode.bind(this)}>Forget your password?</a></p>
                </div>
              </form>
            </div>
          </div>
        }
      </Transition>
    )
  }

  _handleSubmit(event) {
    const email = $(this.refs.email).val()
    const password = $(this.refs.password).val()
    this.props.onClearFlash()
    this.props.onSignin(email, password)
    event.preventDefault()
    return false
  }

  _handleChangeMode() {
    this.props.onChangeMode('reset')
  }

}

const mapStateToProps = (state) => ({
  mode: state.chrome.session.mode,
  flash: state.chrome.flash
})

const mapDispatchToProps = {
  onChangeMode: actions.changeMode,
  onClearFlash: actions.clearFlash,
  onSetFlash: actions.setFlash,
  onSignin: actions.signin
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
