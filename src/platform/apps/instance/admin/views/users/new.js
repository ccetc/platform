import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return (
      <div className="form">
        <div className="form-header">
          <div className="form-header-left" onClick={ this._handleClose.bind(this) }>
            Cancel
          </div>
          <div className="form-header-right">
            Save
          </div>
        </div>
        <div className="form-body">
          New User!
        </div>
      </div>
    )
  }

  _handleClose() {
    this.context.modal.close()
  }

}

export default Edit
