import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import New from './new'
import ExpenseTypeToken from '../../components/expense_type_token'
import ProjectToken from '../../components/project_token'
import { ApprovalBadge } from '../../components/approval_status'

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
      endpoint: '/admin/expenses/expenses',
      columns: [
        { label: 'Date', key: 'date', primary: true , format: 'date' },
        { label: 'Project', key: 'project.title', primary: true },
        { label: 'Vendor', key: 'vendor.name', primary: false },
        { label: 'Expense Type', key: 'expense_type.title', primary: false },
        { label: 'Amount', key: 'amount', primary: true, format: 'currency' },
        { label: 'Status', key: 'is_approved', primary: true, format: ApprovalBadge }
      ],
      filters: [
        { label: 'Projects', name: 'project_id', type: 'select', multiple: true, endpoint: '/admin/expenses/projects', value: 'id', text: 'title', format: ProjectToken },
        { label: 'Expense Type', name: 'expense_type_id', type: 'select', multiple: true, endpoint: '/admin/expenses/expense_types', value: 'id', text: 'title', format: ExpenseTypeToken },
        { label: 'Date Range', name: 'date', type: 'daterange', include: ['this','last'] },
        { label: 'Visa', name: 'is_visa', type: 'select', options: [ { value: '1', text: 'Yes', token: 'Visa Expenses' }, { value: '0', text: 'No', token: 'Non-Visa Expenses' } ] },
        { label: 'Status', name: 'is_approved', type: 'select', multiple: true, options: [ { value: 'null', text: 'Unreviewed' }, { value: '1', text: 'Approved' }, { value: '0', text: 'Rejected' } ] }
      ],
      link: '/admin/expenses/expenses/#{id}',
      sort: { key: 'date', order: 'desc' },
      entity: 'expense',
      empty: {
        icon: 'dollar',
        modal: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/expenses/#{id}/edit'}
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Expenses',
  rights: ['expenses.manage_expenses'],
  task: {
    label: 'New Expense',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
