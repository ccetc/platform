import React from 'react'
import Feed from 'portals/admin/components/feed'

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
          <Feed items={notifications} onChoose={this._handleClose.bind(this)} />
        </div>
      </div>
    )
  }

  _handleClose() {
    this.context.modal.close()
  }

}

export default Index
