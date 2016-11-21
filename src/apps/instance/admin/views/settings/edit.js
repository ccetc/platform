import React from 'react'
import Main from 'platform/admin/components/chrome/components/main'

class Edit extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Edit Settings</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Settings',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Settings' }
      ]
    }
  }

}

export default Edit
