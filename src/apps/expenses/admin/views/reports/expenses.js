import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import { ApprovalBadge } from '../../components/approval_status'
import UserToken from '../../components/user_token'
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
      endpoint: '/admin/expenses/reports/expenses',
      columns: [
        { label: 'Date', key: 'date', primary: true , format: 'date' },
        { label: 'User', key: 'user.full_name', primary: true },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Vendor', key: 'vendor.name', primary: false },
        { label: 'Expense Type', key: 'expense_type.title', primary: false },
        { label: 'Amount', key: 'amount', primary: true, format: 'currency' },
        { label: 'Status', key: 'is_approved', primary: true, format: ApprovalBadge }
      ],
      filters: [
        { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/admin/team/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' }, format: UserToken },
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title', format: ProjectToken },
        { label: 'Expense Type', name: 'expense_type_id', type: 'select', multiple: true, endpoint: '/admin/expenses/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken },
        { label: 'Vendor', name: 'vendor_id', type: 'select', multiple: true, endpoint: '/admin/expenses/vendors', value: 'id', text: 'name' },
        { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
        { label: 'Visa', name: 'is_visa', type: 'select', options: [ { value: '1', text: 'Yes', token: 'Visa Expenses' }, { value: '0', text: 'No', token: 'Non-Visa Expenses' } ] },
        { label: 'Status', name: 'is_approved', type: 'select', options: [ { value: 'null', text: 'Unreviewed' }, { value: '1', text: 'Approved' }, { value: '0', text: 'Rejected' } ] }
      ],
      export: true,
      link: '/admin/expenses/reports/expenses/#{id}',
      sort: { key: 'date', order: 'desc' },
      entity: 'expense'
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Expenses Report',
  rights: ['expenses.access_reports']
})

export default Page(mapPropsToPage)(Index)
