import React from 'react'
import Page from 'portals/admin/components/page'

class List extends React.Component {

  render() {
    return (
      <Page {...this._getMain()}>
        <p>Advances List</p>
      </Page>
    )
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Advances',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Advances' }
      ]
    }
  }

}

export default List
