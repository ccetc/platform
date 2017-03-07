import React from 'react'
import Collection from 'admin/components/collection'
import Feed from './feed'

class Notifications extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
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
          <Collection { ...this._getCollection() } />
        </div>
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/notifications',
      sort: { key: 'created_at', order: 'desc' },
      layout: Feed,
      entity: 'notifications'
    }
  }

  _handleClose() {
    this.context.modal.pop()
  }

}

export default Notifications
