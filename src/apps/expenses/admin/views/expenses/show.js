import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Edit from './edit'

class Show extends React.Component {

  render() {
    const { expense } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          { expense.is_approved === true && <div className="ui center aligned green inverted segment">This expense has been approved</div> }
          { expense.is_approved === false && <div className="ui center aligned red inverted segment">This expense has been rejected</div> }
          { expense.is_approved === null && <div className="ui center aligned blue inverted segment">This expense has not yet been reviewed</div> }
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content">
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

const Receipt = (props) => {
  return <ReceiptView {...props.value} />
}

class ReceiptView extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <a onClick={ this._handleClick.bind(this) }>View Receipt</a>
  }

  _handleClick() {
    this.context.modal.push(<ReceiptModal { ...this.props } />)
  }

}

class ReceiptModal extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return (
      <div className="chrome-modal-panel">
        <div className="chrome-modal-panel-header">
          <div className="chrome-modal-panel-header-cancel">
          </div>
          <div className="chrome-modal-panel-header-title">
            Receipt
          </div>
          <div className="chrome-modal-panel-header-proceed" onClick={ this._handleClose.bind(this) }>
            Done
          </div>
        </div>
        <div className="chrome-modal-panel-body receipt">
          <img src={ this.props.url } />
        </div>
      </div>
    )
  }

  _handleClose() {
    this.context.modal.pop()
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Expense',
  rights: ['expenses.manage_expenses'],
  tasks: [
    { label: 'Edit Expense', modal: Edit }
  ],
  resources: {
    expense: `/admin/expenses/expenses/${props.params.id}`
  }
})

export default Page(mapPropsToPage)(Show)
