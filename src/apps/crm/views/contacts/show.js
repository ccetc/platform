import React from 'react'
import Main from 'platform/components/chrome/components/main'

class Show extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <p>Ken Schlather</p>
      </Main>
    )
  }

  _getMain() {
    return {
      title: 'Ken Schlather',
      permissions: [
        'can access contacts'
      ],
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Contacts', route: '/admin/crm/contacts' },
        { label: 'Ken Schlather' }
      ]
    }
  }

}

export default Show
