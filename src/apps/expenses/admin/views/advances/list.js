import React from 'react'
import Main from 'platform/admin/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Advances List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Advances',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Advances' }
      ]
    }
  }

}

export default List
