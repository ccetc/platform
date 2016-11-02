import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Signin extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes: {
    flash: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    onClearFlash: React.PropTypes.func.isRequired,
    onSetFlash: React.PropTypes.func.isRequired,
    onSignin: React.PropTypes.func.isRequired
  }

  render() {
    const { flash } = this.props
    return (
      <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
        {flash !== null &&
          <div className={`ui ${flash.style} message`}>
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
          <p><Link to="/admin/reset">Forget your password?</Link></p>
        </div>
      </form>
    )
  }

  componentDidMount() {
    this._handleRedirect()
  }

  componentDidUpdate() {
    this._handleRedirect()
  }

  _handleRedirect() {
    if(this.props.user) {
      this.context.router.push('/admin')
    }
  }

  _handleSubmit(event) {
    const email = $(this.refs.email).val()
    const password = $(this.refs.password).val()
    this.props.onClearFlash()
    this.props.onSignin(email, password)
    event.preventDefault()
    return false
  }

}

const mapStateToProps = (state) => ({
  flash: state.session.flash,
  user: state.session.user
})

const mapDispatchToProps = {
  onClearFlash: actions.clearFlash,
  onSetFlash: actions.setFlash,
  onSignin: actions.signin
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
