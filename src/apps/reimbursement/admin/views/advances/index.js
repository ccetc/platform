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
      endpoint: '/admin/reimbursement/advances',
      columns: [
        { label: 'User', key: 'user.full_name', primary: true },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Amount', key: 'amount', primary: true, formt: 'currency' }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'advance',
      empty: {
        icon: 'arrow circle right',
        component: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/reimbursement/advances/#{id}/edit'}
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  back: '/admin',
  title: 'Advances',
  task: {
    label: 'New Advance',
    icon: 'plus',
    component: New
  }
})

export default Page(mapPropsToPage)(Index)
