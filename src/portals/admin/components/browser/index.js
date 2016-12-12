import React from 'react'
import { connect } from 'react-redux'
import component from 'ui/component'
import * as actions from './actions'

class Browser extends React.Component {

  static childContextTypes = {
    browser: React.PropTypes.object
  }

  static propTypes = {
    enabled: React.PropTypes.bool.isRequired
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
    const { notification, clearNotification } = this.props
    if(prevProps.notification !== notification && notification !== null) {
      new Notification('Title', {
        body: notification
      })
      clearNotification()
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

}

const mapStateToProps = state => ({
  enabled: state.browser.enabled,
  notification: state.browser.notification
})

const mapDispatchToProps = {
  onEnable: actions.enable,
  pushNotification: actions.pushNotification,
  clearNotification: actions.clearNotification
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Browser), 'browser', true)
