import React from 'react'
import Page from 'portals/admin/components/chrome/page'
import Collection from 'ui/components/collection'
import New from './new'

class Index extends React.Component {

  render() {
    return (
      <Page {...this._getPage()}>
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
      empty: {
        icon: 'car',
        component: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/trips/#{id}/edit'}
      ]
    }
  }

  _getPage() {
    return {
      back: '/admin',
      title: 'Trips',
      task: {
        label: 'New Trip',
        icon: 'plus',
        component: New
      }
    }
  }

}

export default Index
