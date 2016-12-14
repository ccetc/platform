import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Electron extends React.Component {

  static childContextTypes = {
    electron: React.PropTypes.object
  }

  static propTypes = {
    enabled: React.PropTypes.bool.isRequired
  }

  render() {
    const { children, enabled } = this.props
    return (
      <div className={ enabled ? 'electron' : null }>
        { children }
      </div>
    )
  }

  componentDidMount() {
    const { query } = this.props.location
    if(query.electron) {
      this.props.onEnable()
    }
  }

  componentDidUpdate(prevProps) {
    const { notification } = this.props
    if(prevProps.notification !== notification && notification !== null) {
      this._handleNotification(notification.title, notification.body, notification.icon)
    }
  }

  getChildContext() {
    const { pushNotification } = this.props
    return {
      electron: {
        pushNotification
      }
    }
  }

  _handleNotification(title, body, icon) {
    const { clearNotification } = this.props
    new Notification(title, {
      title,
      body,
      icon
    })
    clearNotification()
  }

}

const mapStateToProps = state => ({
  enabled: state.electron.enabled,
  notification: state.electron.notification
})

const mapDispatchToProps = {
  onEnable: actions.enable,
  pushNotification: actions.pushNotification,
  clearNotification: actions.clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Electron)
