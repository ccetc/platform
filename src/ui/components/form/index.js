import React from 'react'

class Form extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const { fields, title } = this.props
    return (
      <div className="form">
        <div className="form-header">
          <div className="form-header-cancel">
            <a onClick={ this._handleClose.bind(this) }>
              Cancel
            </a>
          </div>
          <div className="form-header-title">
            { title }
          </div>
          <div className="form-header-proceed">
            <a onClick={ this._handleClose.bind(this) }>
              Save
            </a>
          </div>
        </div>
        <div className="form-body">
          <form className="ui form">
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

  _handleClose() {
    this.context.modal.close()
  }

}

export default Form
