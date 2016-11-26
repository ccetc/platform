import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return (
      <div className="form">
        <div className="form-header">
          <div className="form-header-left">
            <a onClick={ this._handleClose.bind(this) }>
              Cancel
            </a>
          </div>
          <div className="form-header-right">
            <a onClick={ this._handleClose.bind(this) }>
              Save
            </a>
          </div>
        </div>
        <div className="form-body">
          <form className="ui form">
            <div className="field">
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="field">
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
          </form>
        </div>
      </div>
    )
  }

  _handleClose() {
    this.context.modal.close()
  }

}

export default Edit
