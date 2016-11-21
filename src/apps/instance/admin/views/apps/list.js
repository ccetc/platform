import React from 'react'
import Main from 'platform/admin/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Apps List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Apps',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Apps' }
      ]
    }
  }

}

export default List
