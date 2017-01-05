import React from 'react'

class Roles extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const roles = [
      { title: 'Admin', description: 'can do everything', assigned: true },
      { title: 'Supervisor', description: 'can do most stuff', assigned: true },
      { title: 'Employee', description: 'can do some stuff', assigned: false }
    ]
    return (
      <div className="chrome-modal-panel">
        <div className="chrome-modal-panel-header">
          <div className="chrome-modal-panel-header-cancel" onClick={ this._handleCancel.bind(this) }>
            Cancel
          </div>
          <div className="chrome-modal-panel-header-title">
            Roles
          </div>
          <div className="chrome-modal-panel-header-proceed" onClick={ this._handleSubmit.bind(this) }>
            Save
          </div>
        </div>
        <div className="chrome-modal-panel-body">
          <div className="roles">
            { roles.map((role, index) => {
              return (
                <div key={`role_${index}`} className="role">
                  <div className="role-label">
                    <strong>{ role.title }</strong><br />
                    { role.description }
                  </div>
                  <div className="role-input">
                    <i className={`toggle ${role.assigned ? 'on' : 'off'} icon`} onClick={ this._handleToggleRole.bind(this, role.id) } />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSubmit() {
    this.context.modal.close()
  }

  _handleToggleRole(id) {
    console.log(`toggle role ${id}`)

  }

}

export default Roles
