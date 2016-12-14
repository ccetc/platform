import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Browser extends React.Component {

  static childContextTypes = {
    browser: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    enabled: React.PropTypes.bool,
    permission: React.PropTypes.bool
  }

  render() {
    const { children, enabled } = this.props
    return (
      <div className={ enabled ? 'browser' : null }>
        { children }
      </div>
    )
  }

  componentDidMount() {
    const { query } = this.props.location
    if(!query.cordova && !query.electron) {
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
      browser: {
        pushNotification
      }
    }
  }

  _handleNotification(title, body, icon) {
    const { clearNotification } = this.props
    const { router } = this.context
    if(window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission(function(status) {
        const notification = new Notification(title, {
          title,
          body,
          icon
        })
        notification.onclick = (event) => {
          router.push({ pathname: '/admin' })
          event.target.close()
          event.preventDefault()
        }
      })
    }
    clearNotification()
  }

}

const mapStateToProps = state => ({
  enabled: state.browser.enabled,
  notification: state.browser.notification,
  permission: state.browser.permission
})

const mapDispatchToProps = {
  onEnable: actions.enable,
  pushNotification: actions.pushNotification,
  clearNotification: actions.clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser)
