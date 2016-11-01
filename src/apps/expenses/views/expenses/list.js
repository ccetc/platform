import React from 'react'
import Main from 'platform/components/chrome/components/main'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Expenses List</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Expenses',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Expenses' }
      ]
    }
  }

}

export default List
