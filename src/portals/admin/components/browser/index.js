import React from 'react'
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
    permission: React.PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      permission: (window.Notification) ? Notification.permission : 'denied'
    }
  }

  render() {
    const { children } = this.props
    return (
      <div className="browser">
        <CSSTransitionGroup component={ this.firstChild } transitionName="expanded" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          { this.state.permission === 'default' &&
            <div className="browser-notice">
              <p>We need your permission to <a onClick={this._handleEnableNotifications.bind(this)}>enable desktop notifications</a></p>
              <div className="browser-notice-dismiss">
                <i className="remove icon"></i>
              </div>
            </div>
          }
        </CSSTransitionGroup>
        <div className="browser-main">
          { children }
        </div>
      </div>
    )
  }


  firstChild(props) {
    const childrenArray = React.Children.toArray(props.children)
    return childrenArray[0] || null
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

  _handleEnableNotifications() {
    const { team } = this.props
    Notification.requestPermission(status => {
      this.setState({
        permission: status
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
    const { router } = this.context
    if(this.state.permission) {
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
    }
  }

}

const mapStateToProps = state => ({
  notification: state.browser.notification,
  permission: state.browser.permission,
  team: getActiveTeam(state)
})

const mapDispatchToProps = {
  pushNotification: actions.pushNotification,
  clearNotification: actions.clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser)
