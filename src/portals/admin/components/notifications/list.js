import React from 'react'
import Page from 'portals/admin/components/page'

class List extends React.Component {

  render() {
    return (
      <Page {...this._getPage()}>
        <p>Notifications List</p>
      </Page>
    )
  }

  _getPage() {
    return {
      title: 'Notifications',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Notifications' }
      ]
    }
  }

}

export default List
