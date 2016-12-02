import React from 'react'
import Page from 'portals/admin/components/page'

class New extends React.Component {

  render() {
    return (
      <Page {...this._getPage()}>
        Apps
      </Page>
    )
  }

  _getPage() {
    const { params } = this.props
    return {
      back: `/admin/users/${params.id}`,
      title: 'Edit User',
      permissions: ['foo']
    }
  }

}

export default New
