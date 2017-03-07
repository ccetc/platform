import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Approve from '../../components/approve'
import checkOwnerApprover from '../../utils/check_owner_approver'
import { ApprovalAlert } from '../../components/approval_status'

class Show extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    flash: React.PropTypes.object
  }

  render() {
    const { advance } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <ApprovalAlert {...advance} />
          <Details {...this._getDetails()} />
          { advance.is_approved === null && <Approve {...this._getApprove()} /> }
        </div>
      </div>
    )
  }

  _getDetails() {
    const { advance } = this.props
    return {
      items: [
        { label: 'Date Needed', content: advance.date_needed, format: 'date' },
        { label: 'User', content: advance.user.full_name },
        { label: 'Project', content: advance.project.title },
        { label: 'Expense Type', content: advance.expense_type.description },
        { label: 'Vendor', content: advance.vendor.name },
        { label: 'Description', content: advance.description },
        { label: 'Amount', content: advance.amount, format: 'currency' },
        { label: 'Reason Rejected', content: advance.reason_rejected }

      ]
    }
  }

  _getApprove() {
    return {
      type: 'advances',
      id: this.props.advance.id,
      onChange: () => {
        this.context.container.refresh('advance')
        this.context.flash.set('success', 'This expense was successfully approved')
      }
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Approve Advance',
  access: checkOwnerApprover,
  resources: {
    advance: `/admin/expenses/approvals/advances/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
