import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as actions from './actions'

class Security extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
    session: React.PropTypes.object
  }

  render() {
    const { question, flash, status } = this.props
    return (
      <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
        <p>Before we reset your password, please answer the following security question.</p>
        {flash &&
          <div className={`chrome-flash ${flash.style}`}>
            {flash.message}
          </div>
        }
        <div className="field answer-field">
          <label>{question.text}</label>
          <input className="form-control" autoComplete="off" placeholder="Answer" type="text" ref="answer" />
        </div>
        <div className="field">
          <button className={`ui fluid large ${(status == 'submitting') ? 'loading' : ''} button`}>Next &raquo;</button>
        </div>
      </form>
    )
  }

  componentDidMount() {
    const answer = $(this.refs.answer)
    setTimeout(function() { answer.focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { error, status } = this.props
    if(prevProps.status != status) {
      if(status === 'verified') {
        this.context.router.push('/admin/reset/password')
      } else if(status == 'failure') {
        this.context.session.setFlash('info', error)
      }
    }
  }

  _handleSubmit(event) {
    const { onVerify, question, token } = this.props
    const answer = $(this.refs.answer).val()
    onVerify(token, question.index, answer)
    event.preventDefault()
    return false
  }

}

const mapStateToProps = state => state.reset

const mapDispatchToProps = {
  onVerify: actions.verify
}

export default connect(mapStateToProps, mapDispatchToProps)(Security)
