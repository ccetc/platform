import React from 'react'
import Main from 'platform/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Vendors List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Vendors',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Vendors' }
      ]
    }
  }

}

export default List
