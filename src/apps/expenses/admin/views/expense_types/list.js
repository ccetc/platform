import React from 'react'
import Main from 'platform/admin/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Expense Types List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Expense Types',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Expense Types' }
      ]
    }
  }

}

export default List
