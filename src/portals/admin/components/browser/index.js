import React from 'react'
import _ from 'lodash'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { getActiveTeam} from '../admin/selectors'
import * as actions from './actions'

class Browser extends React.Component {

  static childContextTypes = {
    browser: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    notification: React.PropTypes.object,
    preferences: React.PropTypes.object,
    teams: React.PropTypes.array,
    onSetPreference: React.PropTypes.func,
    onSavePreferences: React.PropTypes.func,
    onLoadPreferences: React.PropTypes.func
  }

  render() {
    const { children, preferences } = this.props
    const notifications = preferences ? preferences.notifications : undefined
    return (
      <div className="browser">
        <CSSTransitionGroup component={ this.firstChild } transitionName="expanded" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          { preferences && (notifications === undefined || notifications === 'dismiss') &&
            <div className="browser-notice">
              { notifications === undefined &&
                <div>
                  <p>We need your permission to <a onClick={this._handleEnableNotifications.bind(this)}>enable desktop notifications</a></p>
                  <div className="browser-notice-dismiss" onClick={this._handleDenyNotifications.bind(this, 'dismiss')}>
                    <i className="remove icon"></i>
                  </div>
                </div>
              }
              { notifications === 'dismiss' &&
                <p>
                  We strongly recommend enabling desktop notifications on this computer!<br />
                  <a onClick={this._handleEnableNotifications.bind(this)}>Enable desktop notifications</a> &nbsp;&bull;&nbsp;
                  <a onClick={this._handleDenyNotifications.bind(this, 'now')}>Ask me next time</a> &nbsp;&bull;&nbsp;
                  <a onClick={this._handleDenyNotifications.bind(this, 'never')}>Never ask again on this computer</a>
                </p>
              }
            </div>
          }
        </CSSTransitionGroup>
        <div className="browser-main">
          { children }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onLoadPreferences()
  }

  componentDidUpdate(prevProps) {
    const { preferences, notification } = this.props
    if(prevProps.preferences !== preferences && prevProps.preferences === null && preferences.notifications !== 'never' && Notification && Notification.permission === 'default') {
      this.props.onSavePreferences(_.omit(preferences, ['notifications']))
    }
    if(prevProps.notification !== notification && notification !== null) {
      this._handleNotification(notification.title, notification.body, notification.icon)
    }
  }

  firstChild(props) {
    const childrenArray = React.Children.toArray(props.children)
    return childrenArray[0] || null
  }

  getChildContext() {
    const { pushNotification } = this.props
    return {
      browser: {
        pushNotification
      }
    }
  }

  _handleDenyNotifications(severity) {
    const { preferences, onSavePreferences, onSetPreference } = this.props
    if(severity === 'never') {
      onSavePreferences({
        ...preferences,
        notifications: 'never'
      })
    } else if (severity === 'now') {
      onSetPreference('notifications', 'denied')
    } else if (severity === 'dismiss') {
      onSetPreference('notifications', 'dismiss')
    }
  }

  _handleEnableNotifications() {
    const { preferences, team, onSavePreferences } = this.props
    Notification.requestPermission(status => {
      onSavePreferences({
        ...preferences,
        notifications: status
      })
      if(status == 'granted') {
        const notification = new Notification(team.title, {
          tite: team.title,
          body: 'Thank you for enabling notifications!',
          icon: team.logo
        })
        notification.onclick = (event) => {
          event.target.close()
          event.preventDefault()
        }
      }
    })
  }

  _handleNotification(title, body, icon) {
    const { preferences } = this.props
    const { router } = this.context
    if(preferences.notifications === 'granted') {
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
    } else {
      
    }
  }

}

const mapStateToProps = state => ({
  preferences: state.browser.preferences,
  notification: state.browser.notification,
  permission: state.browser.permission,
  team: getActiveTeam(state)
})

const mapDispatchToProps = {
  onSetPreference: actions.setPreference,
  onSavePreferences: actions.savePreferences,
  onLoadPreferences: actions.loadPreferences,
  pushNotification: actions.pushNotification,
  clearNotification: actions.clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser)
