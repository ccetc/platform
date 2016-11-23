import React from 'react'
import Main from 'portals/admin/components/main'

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
      back: '/admin',
      title: 'Expense Types'
    }
  }

}

export default List
