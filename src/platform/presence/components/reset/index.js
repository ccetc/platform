import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import $ from 'jquery'
import * as actions from './actions'

export class Reset extends React.Component {

  static propTypes: {
    flash: React.PropTypes.object.isRequired,
    status: React.PropTypes.string.isRequired,
    onReset: React.PropTypes.func.isRequired
  }

  render() {
    const { flash, status } = this.props
    return (
      <div className="chrome-reset">
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
            <p><Link to="/admin/signin">Back to Signin</Link></p>
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
    const { onReset } = this.props
    const email = $(this.refs.email).val()
    onReset(email)
    event.preventDefault()
    return false
  }


}

const mapStateToProps = (state) => ({
  status: state.reset.status,
  flash: state.flash
})

const mapDispatchToProps = {
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
