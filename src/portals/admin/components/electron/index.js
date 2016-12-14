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
    if(this.props.location.query.electron) {
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
      electron: {
        pushNotification
      }
    }
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
