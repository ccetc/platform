import React from 'react'
import Main from 'platform/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Users List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Users',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Users' }
      ]
    }
  }

}

export default List
