import React from 'react'
import Main from 'portals/admin/components/main'

class New extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        Edit User!
      </Main>
    )
  }

  _getMain() {
    const { params } = this.props
    return {
      back: `/admin/instance/users/${params.id}`,
      title: 'Edit User',
      permissions: []
    }
  }

}

export default New
