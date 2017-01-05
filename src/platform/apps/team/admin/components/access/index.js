import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

class Access extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  static propTypes = {
    access: React.PropTypes.array,
    toggleApp: React.PropTypes.func,
    toggleRight: React.PropTypes.func
  }

  render() {
    const { access } = this.props
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
            { access.map((app, appindex) => {
              return (
                <div key={`app_${appindex}`} className="access-app">
                  <div className="access-app-title">
                    <div className="access-app-label">
                      { app.title }
                    </div>
                    <div className="access-app-input">
                      <i className={`toggle ${app.installed ? 'on' : 'off'} icon`} onClick={ this._handleToggleApp.bind(this, appindex) } />
                    </div>
                  </div>
                  <CSSTransitionGroup transitionName="expanded" component="div" transitionEnterTimeout={ 250 } transitionLeaveTimeout={ 250 }>
                    { app.installed &&
                      <div className="access-rights">
                        { app.rights.map((right, rightindex) => {
                          return (
                            <div key={`app_right_${rightindex}`} className="access-right">
                              <div className="access-right-label">
                                <strong>{ right.text }</strong><br />
                                { right.description }
                              </div>
                              <div className="access-right-input">
                                <i className={`toggle ${right.assigned ? 'on' : 'off'} icon`} onClick={ this._handleToggleRight.bind(this, appindex, rightindex) } />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    }
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

  _handleToggleApp(index) {
    this.props.onToggleApp(index)
  }

  _handleToggleRight(appIndex, index) {
    this.props.onToggleRight(appIndex, index)
  }

}

const mapStateToProps = state => ({
  access: state.access.access
})

const mapDispatchToProps = {
  onToggleApp: actions.toggleApp,
  onToggleRight: actions.toggleRight
}

export default connect(mapStateToProps, mapDispatchToProps)(Access)
