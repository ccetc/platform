import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import { ApprovalAlert } from '../../components/approval_status'
import Receipt from '../../components/receipt'

class Show extends React.Component {

  render() {
    const { expense } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <ApprovalAlert {...expense} />
          <Details {...this._getDetails()} />
        </div>
      </div>
    )
  }

  _getDetails() {
    const { expense } = this.props
    const approved_by_label = expense.is_approved ? 'Approved By' : 'Rejected By'
    const approved_by_value = expense.approved_by ? expense.approved_by.full_name : null
    const approved_at_label = expense.is_approved ? 'Approved At' : 'Rejected At'
    return {
      items: [
        { label: 'Receipt ', content: expense.receipt, format: Receipt },
        { label: 'Date ', content: expense.date, format: 'date' },
        { label: 'User ', content: expense.user.full_name },
        { label: 'Project ', content: expense.project.title },
        { label: 'Expense Type ', content: expense.expense_type.description },
        { label: 'Vendor ', content: expense.vendor.name },
        { label: 'Description ', content: expense.description },
        { label: 'Amount ', content: expense.amount, format: 'currency' },
        { label: 'Visa? ', content: expense.is_visa, format: 'yes_no' },
        { label: approved_by_label, content: approved_by_value },
        { label: approved_at_label, content: expense.approved_at, format: 'datetime' },
        { label: 'Reason Rejected ', content: expense.reason_rejected }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Expense',
  rights: ['expenses.access_reports'],
  resources: {
    expense: `/admin/expenses/reports/expenses/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
