import React from 'react'
import Main from 'platform/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Email List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Email',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Email' }
      ]
    }
  }

}

export default List
