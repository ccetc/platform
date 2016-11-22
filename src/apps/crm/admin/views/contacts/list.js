import React from 'react'
import Main from 'portals/admin/components/main'
import Collection from 'ui/components/collection'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <Collection {...this._getCollection()} />
      </Main>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/crm/contacts',
      columns: [
        { label: 'Name', key: 'first_name', primary: true },
        { label: 'Email', key: 'email' }
      ]
    }
  }

  _getMain() {
    return {
      title: 'Contacts',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Contacts' }
      ]
    }
  }

}

export default List
