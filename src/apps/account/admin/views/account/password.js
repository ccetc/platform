import React from 'react'
import Main from 'platform/admin/components/chrome/components/main'

class Password extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Change Password</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Change Password',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Change Password' }
      ]
    }
  }

}

export default Password
