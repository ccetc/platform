import React from 'react'
import Page from 'portals/admin/components/page'
import Collection from 'ui/components/collection'
import New from './new'

class Index extends React.Component {

  render() {
    return (
      <Page {...this._getMain()}>
        <Collection {...this._getCollection()} />
      </Page>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/expenses/trips',
      columns: [
        { label: 'Name', key: 'name', primary: true }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'trip',
      empty: 'There are no trips',
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/trips/#{id}/edit'}
      ]
    }
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Trips',
      task: {
        label: 'New Trip',
        icon: 'plus',
        component: <New />
      }
    }
  }

}

export default Index
