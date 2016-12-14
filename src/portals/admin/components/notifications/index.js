import React from 'react'
import { connect } from 'react-redux'
import { getActiveTeam } from '../admin/selectors'
import * as actions from './actions'

export class Notifications extends React.Component {

  static childContextTypes = {
    notifications: React.PropTypes.object
  }

  static contextTypes = {
    browser: React.PropTypes.object,
    electron: React.PropTypes.object
  }

  static propTypes = {
    queue: React.PropTypes.array.isRequired,
    onPushNotification: React.PropTypes.func.isRequired,
    onReadNotification: React.PropTypes.func.isRequired
  }

  render() {
    const { children, queue } = this.props
    return (
      <div>
        <div className="chrome-notifications">
          { queue.length > 0 &&
            <div className="ui raised segments">
              { queue.map((notification, index) => {
                return (
                  <div key={`notification_${index}`} className="ui segment">
                    <i className="remove icon" onClick={this.readNotification.bind(this, notification.id)}></i>
                    {notification.story.text}
                  </div>
                )
              })}
            </div>
          }
        </div>
        { children }
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  getChildContext() {
    return {
      notifications: {
        push: this._handlePushNotification.bind(this)
      }
    }
  }

  _handlePushNotification(message) {
    const { browser, electron, team } = this.props
    if(electron) {
      this.context.electron.pushNotification(team.title, message, team.logo)
    } else if(browser) {
      this.context.browser.pushNotification(team.title, message, team.logo)
    }
  }

}

const mapStateToProps = (state, props) => ({
  browser: state.browser.enabled,
  electron: state.electron.enabled,
  queue: state.notifications.queue,
  team: getActiveTeam(state)
})

const mapDispatchToProps = {
  onReadNotification: actions.readNotification,
  onPushNotification: actions.pushNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
