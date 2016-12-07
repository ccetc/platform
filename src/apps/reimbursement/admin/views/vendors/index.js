import React from 'react'
import Page from 'portals/admin/components/page'
import Collection from 'ui/components/collection'
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
      endpoint: '/admin/reimbursement/vendors',
      columns: [
        { label: 'Name', key: 'name', primary: true }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'vendor',
      empty: {
        icon: 'shop',
        component: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/reimbursement/vendors/#{id}/edit'}
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  back: '/admin',
  title: 'Vendors',
  task: {
    label: 'New Vendor',
    icon: 'plus',
    component: New
  }
})

export default Page(mapPropsToPage)(Index)
