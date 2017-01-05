import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'

class Access extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const apps = [
      { id: 1, title: 'Team', installed: false, rights: [
        { id: 1, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
        { id: 2, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 3, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 4, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true }
      ]},
      { id: 2, title: 'Reimbursement', installed: true, rights: [
        { id: 5, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
        { id: 6, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
        { id: 7, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 8, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true }
      ]},
      { id: 3, title: 'Competency', installed: true, rights: [
        { id: 9, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 10, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
        { id: 11, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 12, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false }
      ]},
      { id: 4, title: 'Learning', installed: true, rights: [
        { id: 13, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 14, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 15, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
        { id: 16, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false }
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
                      <i className={`toggle ${app.installed ? 'on' : 'off'} icon`} onClick={ this._handleToggleApp.bind(this, app.id) } />
                    </div>
                  </div>
                  <CSSTransitionGroup transitionName="expanded" component="div" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
                    { app.installed && app.rights.map((right, rightindex) => {
                      return (
                        <div key={`app_right_${rightindex}`} className="access-right">
                          <div className="access-right-label">
                            <strong>{ right.text }</strong><br />
                            { right.description }
                          </div>
                          <div className="access-right-input">
                            <i className={`toggle ${right.assigned ? 'on' : 'off'} icon`} onClick={ this._handleToggleRight.bind(this, right.id) } />
                          </div>
                        </div>
                      )
                    })}
                  </CSSTransitionGroup>
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

  _handleToggleApp(id) {
    console.log(`toggle app ${id}`)

  }

  _handleToggleRight(id) {
    console.log(`toggle right ${id}`)
  }

}

export default Access
