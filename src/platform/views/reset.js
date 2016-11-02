import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'

class Reset extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object
  }

  render() {
    return (
      <div className="platform-session">
        <div className="ui segments">
          <div className="ui segment">
            <div className="ui form">
              <div className="ui success message">
                You have been successfully signed out
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input className="form-control" autocomplete="off" placeholder="Email" type="email" ref="email" />
                </div>
              </div>
              <div className="field">
                <button className="ui fluid large submit red button" onClick={this._handleSubmit.bind(this)}>Reset Password</button>
              </div>
              <div className="field">
                <p><Link to="/admin/signin">&laquo; Back to signin</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handleSubmit() {
    const email = $(this.refs.email).val()
    this.context.history.push('/admin/signin')
  }

}

export default Reset
