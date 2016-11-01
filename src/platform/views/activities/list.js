import React from 'react'
import Main from 'platform/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Activities List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Activities',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Activities' }
      ]
    }
  }

}

export default List
