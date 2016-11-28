import React from 'react'

class Password extends React.Component {

  render() {
    return (
      <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="field email-field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input className="form-control" autoComplete="off" placeholder="Password" type="password" ref="password" />
          </div>
        </div>
        <div className="field password-field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input className="form-control" autoComplete="off" placeholder="Confirm Password" type="password" ref="confirm" />
          </div>
        </div>
        <div className="field">
          <button className="ui fluid large button">Reset Password</button>
        </div>
      </form>
    )
  }

  _handleSubmit(event) {
    event.preventDefault()
    return false
  }

}

export default Password
