import React from 'react'
import Page from 'portals/admin/components/chrome/page'

class Reports extends React.Component {

  render() {
    return (
      <Page {...this._getPage()}>
        <div>Reports</div>
      </Page>
    )
  }

  _getPage() {
    return {
      back: '/admin',
      title: 'Reports'
    }
  }

}

export default Reports
