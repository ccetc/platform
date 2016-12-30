import React from 'react'
import Page from 'portals/admin/containers/page'
import Filter from 'portals/admin/views/filter'

class Dashboard extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  render() {
    const filters = [
      { label: 'Users', name: 'user_id', type: 'select', multiple: true, endpoint: '/admin/users', value: 'id', text: 'full_name' },
      { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/reimbursement/projects', value: 'id', text: 'title' },
      { label: 'Expense Type', name: 'expense_type_id', type: 'select', endpoint: '/admin/reimbursement/expense_types', value: 'id', text: 'title' }
    ]
    return (
      <div className="chrome-body">
        <a onClick={ this.context.tray.open.bind(this, <Filter filters={filters} />) }>Open</a>
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Dashboard'
})

export default Page(mapPropsToPage)(Dashboard)
