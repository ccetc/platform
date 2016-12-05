import React from 'react'
import Feed from 'portals/admin/components/feed'

class Index extends React.Component {

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
          <Feed {...this._getFeed()} />
        </div>
      </div>
    )
  }

  _getFeed() {
    return {
      endpoint: '/admin/notifications',
      onChoose: this._handleClose.bind(this)

    }
  }

  _handleClose() {
    this.context.modal.close()
  }

}

export default Index
