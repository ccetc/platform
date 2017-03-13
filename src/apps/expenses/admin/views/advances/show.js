import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Edit from './edit'
import Submit from '../../components/submit'
import { ApprovalAlert } from '../../components/approval_status'

class Show extends React.Component {

  render() {
    const { advance } = this.props
    return (
      <div className="chrome-main">
        <div className="chrome-body">
          <div className="chrome-sidebar">
            <ApprovalAlert {...advance} />
            <Details {...this._getDetails()} />
          </div>
        </div>
        { !advance.is_submitted &&
          <div className="chrome-cta">
            <Submit {...this._getSubmit()} />
          </div>
        }
      </div>
    )
  }

  _getDetails() {
    const { advance } = this.props
    const approved_by_label = advance.is_approved ? 'Approved By' : 'Rejected By'
    const approved_by_value = advance.approved_by ? advance.approved_by.full_name : null
    const approved_at_label = advance.is_approved ? 'Approved At' : 'Rejected At'
    return {
      items: [
        { label: 'Date Needed', content: advance.date_needed, format: 'date' },
        { label: 'Project', content: advance.project.title },
        { label: 'Expense Type', content: advance.expense_type.title },
        { label: 'Vendor', content: advance.vendor.name },
        { label: 'Delivery Method', content: advance.delivery_method },
        { label: 'Description', content: advance.description },
        { label: 'Amount', content: advance.amount, format: 'currency' },
        { label: approved_by_label, content: approved_by_value },
        { label: approved_at_label, content: advance.approved_at, format: 'datetime' },
        { label: 'Reason Rejected', content: advance.reason_rejected }
      ]
    }
  }

  _getSubmit() {
    return {
      type: 'advance',
      id: this.props.advance.id
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Advance',
  rights: ['expenses.manage_expenses'],
  tasks: [
    { label: 'Edit Advance', modal: Edit }
  ],
  resources: {
    advance: `/admin/expenses/advances/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
