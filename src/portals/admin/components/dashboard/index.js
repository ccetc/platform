import React from 'react'
import Page from 'portals/admin/components/page'

class Dashboard extends React.Component {

  render() {
    return (
      <Page {...this._getMain()}>
        <p>Dashboard</p>
      </Page>
    )
  }

  _getMain() {
    return {
      title: 'Dashboard'
    }
  }

}

export default Dashboard
