import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import * as actions from './actions'

class Security extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  render() {
    const { question, flash } = this.props
    return (
      <form className="ui form" onSubmit={this._handleSubmit.bind(this)}>
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
          <button className="ui fluid large button">Next &raquo;</button>
        </div>
      </form>
    )
  }

  componentDidMount() {
    const answer = $(this.refs.answer)
    setTimeout(function() { answer.focus() }, 500)
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(prevProps.status != status) {
      if(status === 'verified') {
        this.context.router.push('/admin/reset/password')
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
