import React from 'react'
import Main from 'platform/admin/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Notifications List</p>
      </Main>
    )
  }

  _getMain() {
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
