import React from 'react'
import Page from 'portals/admin/components/page'
import Collection from 'portals/admin/components/collection'
import New from './new'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Collection {...this._getCollection()} />
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/reimbursement/trips',
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
        { label: 'edit', icon: 'edit', redirect: '/admin/reimbursement/trips/#{id}/edit'}
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  back: '/admin',
  title: 'Trips',
  task: {
    label: 'New Trip',
    icon: 'plus',
    component: New
  }
})

export default Page(mapPropsToPage)(Index)
