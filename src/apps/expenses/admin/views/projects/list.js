import React from 'react'
import Main from 'portals/admin/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Project List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Projects',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Projects' }
      ]
    }
  }

}

export default List
