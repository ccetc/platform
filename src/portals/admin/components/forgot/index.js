import React from 'react'
import { connect } from 'react-redux'
import { Link } from  'react-router'
import $ from 'jquery'
import * as actions from './actions'

export class Forgot extends React.Component {

  static propTypes: {
    flash: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    onReset: React.PropTypes.func.isRequired,
    onSetup: React.PropTypes.func.isRequired
  }

  render() {
    const { flash, status } = this.props
    return (
      <div className="chrome-session chrome-forgot">
        <div className="chrome-session-widget">
          <h1>MyCCE</h1>
          <h3>Cornell Cooperative Extension of Tompkins County</h3>
          <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
            {flash &&
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
              <p><Link to="/admin/signin">Back to Signin</Link></p>
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

  _handleSubmit(event) {
    const { onReset } = this.props
    const email = $(this.refs.email).val()
    onReset(email)
    event.preventDefault()
    return false
  }

}

const mapStateToProps = (state) => ({
  flash: state.forgot.flash,
  status: state.forgot.status
})

const mapDispatchToProps = {
  onReset: actions.reset,
  onSetup: actions.setup
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot)
