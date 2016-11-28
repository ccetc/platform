import React from 'react'
import { Link } from 'react-router'
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
      endpoint: '/admin/expenses/expense_types',
      columns: [
        { label: 'Title', key: 'title', primary: true },
        { label: 'Code', key: 'code', primary: true }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'expense_type',
      empty: 'There are no expense_types',
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/expense_types/#{id}/edit'}
      ]
    }
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Expense Types',
      task: {
        label: 'New Expense Type',
        icon: 'plus',
        component: <New />
      }
    }
  }

}

export default Index
