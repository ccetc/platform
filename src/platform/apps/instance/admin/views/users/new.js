import React from 'react'
import Main from 'portals/admin/components/main'

class New extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        New User!
      </Main>
    )
  }

  _getMain() {
    return {
      back: '/admin/instance/users',
      title: 'New User',
      permissions: []
    }
  }

}

export default New
