import React from 'react'
import Main from 'portals/admin/components/main'

class Dashboard extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Dashboard</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Dashboard'
    }
  }

}

export default Dashboard
