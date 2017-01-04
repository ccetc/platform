import React from 'react'

class Access extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    const apps = [
      { id: 1, title: 'Team', installed: true, rights: [
        { id: 1, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
        { id: 2, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 3, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 4, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true }
      ]},
      { id: 1, title: 'Reimbursement', installed: true, rights: [
        { id: 1, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
        { id: 2, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
        { id: 3, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 4, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true }
      ]},
      { id: 1, title: 'Competency', installed: true, rights: [
        { id: 1, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 2, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
        { id: 3, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 4, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false }
      ]},
      { id: 1, title: 'Learning', installed: true, rights: [
        { id: 1, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 2, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 3, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 4, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false }
      ]}
    ]
    return (
      <div className="chrome-modal-panel">
        <div className="chrome-modal-panel-header">
          <div className="chrome-modal-panel-header-cancel" onClick={ this._handleCancel.bind(this) }>
            Cancel
          </div>
          <div className="chrome-modal-panel-header-title">
            Access Control
          </div>
          <div className="chrome-modal-panel-header-proceed" onClick={ this._handleSubmit.bind(this) }>
            Save
          </div>
        </div>
        <div className="chrome-modal-panel-body">
          <div className="access">
            { apps.map((app, appindex) => {
              return (
                <div key={`app_${appindex}`} className="access-app">
                  <div className="access-app-title">
                    <div className="access-app-label">
                      { app.title }
                    </div>
                    <div className="access-app-input">
                      <i className={`toggle ${app.installed ? 'on' : 'off'} icon`} />
                    </div>
                  </div>
                  { app.rights.map((right, rightindex) => {
                    return (
                      <div key={`app_right_${rightindex}`} className="access-right">
                        <div className="access-right-label">
                          <strong>{ right.text }</strong><br />
                          { right.description }
                        </div>
                        <div className="access-right-input">
                          <i className={`toggle ${right.assigned ? 'on' : 'off'} icon`} />
                        </div>
                      </div>
                    )
                  })}
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

}

export default Access
