import React from 'react'
import { connect } from 'react-redux'
import component from 'ui/component'
import * as actions from './actions'

export class Notifications extends React.Component {

  static contextTypes = {
    session: React.PropTypes.object,
    socket: React.PropTypes.object
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
    // this.context.socket.on('notification', (message) => {
    //   this.props.onPushNotification(message)
    // })
  }

  componentWillUnmount() {
    // this.context.socket.unsubscribe(`/users/${this.context.session.user.id}/notifications`, this.pushNotification.bind(this))
  }

  // readNotification(id) {
  //   this.props.onReadNotification(id)
  // }
  //
  // pushNotification(payload) {
  //   this.props.onPushNotification(payload.message)
  // }

}

const mapStateToProps = state => ({
  queue: state.notifications.queue
})

const mapDispatchToProps = {
  onReadNotification: actions.readNotification,
  onPushNotification: actions.pushNotification
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Notifications), 'notifications', true)
