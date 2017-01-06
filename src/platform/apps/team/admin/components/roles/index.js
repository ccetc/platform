import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Roles extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  static propTypes = {
    roles: React.PropTypes.array,
    onLoad: React.PropTypes.func,
    onToggleRole: React.PropTypes.func
  }

  render() {
    const { roles } = this.props
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
                    <i className={`toggle ${role.assigned ? 'on' : 'off'} icon`} onClick={ this._handleToggleRole.bind(this, index) } />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onLoad()
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSubmit() {
    this.context.modal.close()
  }

  _handleToggleRole(index) {
    this.props.onToggle(index)

  }

}

const mapStateToProps = state => ({
  roles: state.roles.roles
})

const mapDispatchToProps = {
  onLoad: actions.load,
  onToggle: actions.toggle
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles)
