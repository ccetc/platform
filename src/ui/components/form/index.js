import React from 'react'
import $ from 'jquery'

class Form extends React.Component {

  static contextTypes = {
    session: React.PropTypes.object,
    chrome: React.PropTypes.object
  }

  static propTypes = {
    title: React.PropTypes.string,
    fields: React.PropTypes.array,
    successMessage: React.PropTypes.string
  }

  render() {
    const { fields, title } = this.props
    return (
      <div className="form">
        <div className="form-header">
          <div className="form-header-cancel">
            <a onClick={ this._handleCancel.bind(this) }>
              Cancel
            </a>
          </div>
          <div className="form-header-title">
            { title }
          </div>
          <div className="form-header-proceed">
            <a onClick={ this._handleSave.bind(this) }>
              Save
            </a>
          </div>
        </div>
        <div className="form-body">
          <form className="ui form" ref="form">
            {fields.map((field, index) => {
              return (
                <div key={`field_${index}`} className="field">
                  <label>{field.label}</label>
                  <input type="text" name={field.name} placeholder={field.placeholder} />
                </div>
              )
            })}
          </form>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const input = $(this.refs.form).find('input:first')
    setTimeout(function() { input.focus() }, 500)
  }

  _handleCancel() {
    this.context.chrome.closeModal()
  }

  _handleSave() {
    const message = this.props.successMessage || 'Your form was successfully saved!'
    this.context.session.setFlash('success', message)
    this.context.chrome.closeModal()
  }

}

export default Form
