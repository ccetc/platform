import React from 'react'
import $ from 'jquery'

class Security extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  render() {
    return (
      <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="field answer-field">
          <label>What is your mothers maiden name?</label>
          <input className="form-control" autoComplete="off" placeholder="Answer" type="text" ref="answer" />
        </div>
        <div className="field">
          <button className="ui fluid large button">Next &raquo;</button>
        </div>
      </form>
    )
  }

  componentDidMount() {
    const answer = $(this.refs.answer)
    setTimeout(function() { answer.focus() }, 500)
  }

  _handleSubmit(event) {
    this.context.router.push('/admin/reset/password')
    event.preventDefault()
    return false
  }

}

export default Security
