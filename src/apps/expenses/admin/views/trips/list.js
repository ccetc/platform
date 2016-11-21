import React from 'react'
import Main from 'portals/admin/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Trips List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Trips',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Trips' }
      ]
    }
  }

}

export default List
