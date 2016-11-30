import React from 'react'
import Page from 'portals/admin/components/chrome/page'
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
      endpoint: '/admin/expenses/advances',
      columns: [
        { label: 'User', key: 'user.full_name', primary: true },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Amount', key: 'amount', primary: true, formt: 'currency' }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'advance',
      empty: {
        icon: 'dollar',
        component: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/advances/#{id}/edit'}
      ]
    }
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Advances',
      task: {
        label: 'New Advance',
        icon: 'plus',
        component: New
      }
    }
  }

}


export default Index
