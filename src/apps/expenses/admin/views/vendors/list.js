import React from 'react'
import Page from 'portals/admin/components/page'

class List extends React.Component {

  render() {
    return (
      <Page {...this._getMain()}>
        <p>Vendors List</p>
      </Page>
    )
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Vendors'
    }
  }

}

export default List
