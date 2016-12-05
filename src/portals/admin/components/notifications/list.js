import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

class Index extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const notifications = [
      { id: 1, is_read: false, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/expenses/projects/1' }, created_at: new Date() },
      { id: 1, is_read: false, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/expenses/projects/1' }, created_at: new Date() },
      { id: 1, is_read: false, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/expenses/projects/1' }, created_at: new Date() },
      { id: 1, is_read: false, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/expenses/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/expenses/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/expenses/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/expenses/projects/1' }, created_at: new Date() },
      { id: 1, is_read: true, story: { text: 'assigned the task {subject} to you' }, user: { id: 1, full_name: 'Ken Schlather', photo: '/images/ken.jpg'}, subject: { text: 'finish the platform', url: '/admin/expenses/projects/1' }, created_at: new Date() }
    ]
    return (
      <div className="chrome-notifications">
        <div className="chrome-notifications-header">
          <div className="chrome-notifications-header-cancel">
          </div>
          <div className="chrome-notifications-header-title">
            Notifications
          </div>
          <div className="chrome-notifications-header-proceed">
            <a onClick={ this._handleClose.bind(this) }>
              Done
            </a>
          </div>
        </div>
        <div className="chrome-notifications-body">
          <div className="chrome-notifications">

            {notifications.map((notification, index) => {
              let story = notification.story.text
              if(notification.subject) {
                story = story.replace('{subject}', `<span class="chrome-notification-subject">${notification.subject.text}</span>`)
              }
              return (
                <Link key={`notification_${index}`} to={{ pathname: notification.subject.url, state: 'static' }} className={`chrome-notification${!notification.is_read ? ' unread' : ''}`} onClick={ this._handleClose.bind(this) }>
                  <div className="chrome-notification-avatar">
                    <img src={ notification.user.photo } className="ui circular image" />
                  </div>
                  <div className="chrome-notification-details">
                    <div className="chrome-notification-story">
                      <span className="chrome-notification-user">{ notification.user.full_name }</span>
                      <span dangerouslySetInnerHTML={{__html: story }} />
                    </div>
                    <div className="chrome-notification-timestamp">{ moment(notification.created_at).fromNow() } on { moment(notification.created_at).format('dddd, MMMM Do @ h:mm a') }</div>
                  </div>
                </Link>
              )
            })}

          </div>
        </div>
      </div>
    )
  }

  _handleClose() {
    this.context.modal.close()
  }

}

export default Index
