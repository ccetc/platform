import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import New from './new'
import { ApprovalBadge } from '../../components/approval_status'
import ExpenseTypeToken from '../../components/expense_type_token'
import ProjectToken from '../../components/project_token'

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
      endpoint: '/admin/expenses/advances',
      columns: [
        { label: 'Date Needed', key: 'date_needed', primary: true , format: 'date' },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Vendor', key: 'vendor.name', primary: false },
        { label: 'Expense Type', key: 'expense_type.title', primary: false },
        { label: 'Amount', key: 'amount', primary: true, format: 'currency' },
        { label: 'Status', key: 'is_approved', primary: true, format: ApprovalBadge }
      ],
      filters: [
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title', format: ProjectToken },
        { label: 'Expense Type', name: 'expense_type_id', type: 'select', endpoint: '/admin/expenses/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken },
        { label: 'Date Range', name: 'date_needed', type: 'daterange', include: ['this','last','next'] },
        { label: 'Status', name: 'is_approved', type: 'select', multiple: true, options: [ { value: 'null', text: 'Unreviewed' }, { value: '1', text: 'Approved' }, { value: '0', text: 'Rejected' } ] }
      ],
      link: '/admin/expenses/advances/#{id}',
      sort: { key: 'created_at', order: 'desc' },
      entity: 'advance',
      empty: {
        icon: 'arrow circle right',
        modal: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/advances/#{id}/edit'}
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Advances',
  rights: ['expenses.manage_expenses'],
  task: {
    label: 'New Advance',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
