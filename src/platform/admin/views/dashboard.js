import React from 'react'
import Main from 'platform/admin/components/chrome/components/main'

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
      title: 'Dashboard',
      breadcrumbs: [
        { label: 'Dashboard' }
      ]
    }
  }

}

export default Dashboard
