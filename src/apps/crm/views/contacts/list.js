import React from 'react'
import Main from 'platform/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Conatcts List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Contacts',
      permissions: [
        'can access contacts'
      ],
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Contacts' }
      ]
    }
  }

}

export default List
