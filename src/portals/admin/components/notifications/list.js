import React from 'react'
import Page from 'portals/admin/components/page'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <p>Notifications List</p>
      </div>
    )
  }

}

const details = props => ({
  title: 'Notifications',
  breadcrumbs: [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Notifications' }
  ]
})

export default Page(details)(Index)
