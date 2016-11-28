import React from 'react'
import Page from 'portals/admin/components/page'

class Reports extends React.Component {

  render() {
    return (
      <Page {...this._getMain()}>
        <div>Reports</div>
      </Page>
    )
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Reports'
    }
  }

}

export default Reports
