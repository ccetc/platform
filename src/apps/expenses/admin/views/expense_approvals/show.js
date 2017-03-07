import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Approve from '../../components/approve'
import Receipt from '../../components/receipt'
import checkOwnerApprover from '../../utils/check_owner_approver'
import { ApprovalAlert } from '../../components/approval_status'

class Show extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    flash: React.PropTypes.object
  }

  render() {
    const { expense } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <ApprovalAlert {...expense} />
          <Details {...this._getDetails()} />
          { expense.is_approved === null && <Approve {...this._getApprove()} /> }
        </div>
      </div>
    )
  }

  _getDetails() {
    const { expense } = this.props
    return {
      items: [
        { label: 'Receipt', content: expense.receipt, format: Receipt },
        { label: 'Date', content: expense.date, format: 'date' },
        { label: 'User', content: expense.user.full_name },
        { label: 'Project', content: expense.project.title },
        { label: 'Expense Type', content: expense.expense_type.description },
        { label: 'Vendor', content: expense.vendor.name },
        { label: 'Description', content: expense.description },
        { label: 'Amount', content: expense.amount, format: 'currency' },
        { label: 'Visa? ', content: expense.is_visa, format: 'yes_no' }
      ]
    }
  }

  _getApprove() {
    return {
      type: 'expenses',
      id: this.props.expense.id,
      onChange: () => {
        this.context.container.refresh('expense')
        this.context.flash.set('success', 'This expense was successfully approved')
      }
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Approve Expense',
  access: checkOwnerApprover,
  resources: {
    expense: `/admin/expenses/approvals/expenses/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
