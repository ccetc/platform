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
      endpoint: '/admin/expenses/expense_types',
      columns: [
        { label: 'Title', key: 'title', primary: true },
        { label: 'Code', key: 'code', primary: true }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'expense_type',
      empty: {
        icon: 'tag',
        component: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/expense_types/#{id}/edit'}
      ]
    }
  }

  _getPage() {
    return {
      back: '/admin',
      title: 'Expense Types',
      task: {
        label: 'New Expense Type',
        icon: 'plus',
        component: New
      }
    }
  }

}

export default Index
