import React from 'react'
import Transition from 'react-addons-css-transition-group'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Reset extends React.Component {

  static propTypes: {
    mode: React.PropTypes.string.isRequired,
    flash: React.PropTypes.object.isRequired,
    status: React.PropTypes.string.isRequired,
    onChangeMode: React.PropTypes.func.isRequired,
    onReset: React.PropTypes.func.isRequired,
    onResetSuccess: React.PropTypes.func.isRequired
  }

  render() {
    const { mode, flash, status } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        { mode == 'reset' &&
          <div className="chrome-reset-canvas">
            <div className="chrome-reset">
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
                  <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Reset Password</button>
                </div>
                <div className="field">
                  <p><a onClick={this._handleChangeMode.bind(this)}>Back to Signin</a></p>
                </div>
              </form>
            </div>
          </div>
        }
      </Transition>
    )
  }

  _handleSubmit(event) {
    const { onReset, onResetSuccess } = this.props
    const email = $(this.refs.email).val()
    onReset(email)
    setTimeout(onResetSuccess, 1500)
    event.preventDefault()
    return false
  }

  _handleChangeMode() {
    this.props.onChangeMode('signin')
  }

}

const mapStateToProps = (state) => ({
  mode: state.chrome.session.mode,
  status: state.chrome.session.status,
  flash: state.chrome.flash
})

const mapDispatchToProps = {
  onChangeMode: actions.changeMode,
  onReset: actions.reset,
  onResetSuccess: actions.resetSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
