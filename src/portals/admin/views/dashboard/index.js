import React from 'react'
import Page from 'portals/admin/containers/page'
import Filter from 'portals/admin/views/filter'

class Dashboard extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  render() {
    return (
      <div className="chrome-body">
        <a onClick={ this.context.tray.open.bind(this, Filter) }>Open</a>
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Dashboard'
})

export default Page(mapPropsToPage)(Dashboard)
