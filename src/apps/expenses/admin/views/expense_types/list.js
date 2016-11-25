import React from 'react'
import Page from 'portals/admin/components/page'

class List extends React.Component {

  render() {
    return (
      <Page {...this._getMain()}>
        <p>Expense Types List</p>
      </Page>
    )
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Expense Types'
    }
  }

}

export default List
