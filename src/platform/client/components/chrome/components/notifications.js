import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Notifications extends React.Component {

  static contextTypes = {
    session: React.PropTypes.object
  }

  static propTypes: {
    queue: React.PropTypes.array.isRequired,
    onPushNotification: React.PropTypes.func.isRequired,
    onReadNotification: React.PropTypes.func.isRequired
  }

  render() {
    const { queue } = this.props
    return (
      <div className="chrome-notifications">
        { queue.length > 0 &&
          <div className="ui raised segments">
            { queue.map((notification, index) => {
              return (
                <div key={`notification_${index}`} className="ui segment">
                  <i className="fa fa-times" onClick={this.readNotification.bind(this, notification.id)}></i>
                  {notification.story.text}
                </div>
              )
            })}
          </div>
        }
      </div>
    )
  }

  // componentDidMount() {
  //   Socket.subscribe(`/users/${this.context.session.user.id}/notifications`, this.pushNotification.bind(this))
  // }

  // componentWillUnmount() {
  //   Socket.unsubscribe(`/users/${this.context.session.user.id}/notifications`, this.pushNotification.bind(this))
  // }

  readNotification(id) {
    this.props.onReadNotification(id)
  }

  pushNotification(payload) {
    this.props.onPushNotification(payload.message)
  }

}

const mapStateToProps = (state) => ({
  queue: state.chrome.notifications.queue
})

const mapDispatchToProps = {
  onReadNotification: actions.readNotification,
  onPushNotification: actions.pushNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
