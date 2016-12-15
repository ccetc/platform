import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Electron extends React.Component {

  static childContextTypes = {
    electron: React.PropTypes.object
  }

  static propTypes = {
  }

  render() {
    const { children } = this.props
    return (
      <div className="electron">
        { children }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { notification } = this.props
    if(prevProps.notification !== notification && notification !== null) {
      this._handleNotification(notification.title, notification.body)
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

  _handleNotification(title, body) {
    const { clearNotification } = this.props
    new Notification(title, {
      title,
      body
    })
    clearNotification()
  }

}

const mapStateToProps = state => ({
  notification: state.electron.notification
})

const mapDispatchToProps = {
  pushNotification: actions.pushNotification,
  clearNotification: actions.clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Electron)
