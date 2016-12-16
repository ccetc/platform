import React from 'react'
import Page from 'portals/admin/containers/page'

class Dashboard extends React.Component {

  static contextTypes = {
    notifications: React.PropTypes.object
  }

  render() {
    return (
      <div className="chrome-body">
        <a className="ui red button" onClick={ this._handleNotification.bind(this) }>Notify</a>
      </div>
    )
  }

  _handleNotification() {
    this.context.notifications.push(this.props.team.title, 'Sandy Repp just assigned the task "Finish Project" to you')
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Dashboard'
})

export default Page(mapPropsToPage)(Dashboard)
