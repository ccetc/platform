import React from 'react'
import Form from 'admin/components/form'
import moment from 'moment'
import ExpenseTypeFormat from '../../utils/expense_type_format'

class New extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      project_id: null
    }
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const expense_type_endpoint = `/admin/expenses/projects/${this.state.project_id}/expense_types`
    const expense_type_disabled = (this.state.project_id === null)
    return {
      title: 'New Expense',
      method: 'post',
      action: '/admin/expenses/expenses',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      onChangeField: (key, value) => {
        if(key === 'project_id') {
          this.setState({
            project_id: value
          })
        }
      },
      sections: [
        {
          fields: [
            { label: 'Receipt', name: 'receipt_id', type: 'filefield', prompt: 'Upload Receipt' },
            { label: 'Date', name: 'date', type: 'datefield', placeholder: 'Date Needed', defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Project', name: 'project_id', type: 'lookup', placeholder: 'Project', endpoint: '/admin/expenses/memberships', value: 'id', text: 'title' },
            { label: 'Expense Type', name: 'expense_type_id', type: 'lookup', placeholder: 'Expense Type', endpoint: expense_type_endpoint, value: 'id', text: 'title', disabled: expense_type_disabled, format: ExpenseTypeFormat },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', placeholder: 'Vendor', endpoint: '/admin/expenses/vendors', value: 'id', text: 'name', form: this._getVendorForm() },
            { label: 'Description', name: 'description', type: 'textfield', placeholder: 'Description' },
            { label: 'Amount', name: 'amount', type: 'textfield', placeholder: 'Amount', prefix: '$' },
            { label: 'Visa?', name: 'is_visa', type: 'checkbox' }
          ]
        }
      ]
    }
  }

  _getVendorForm() {
    return {
      title: 'New Vendor',
      method: 'post',
      action: '/admin/expenses/vendors',
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Name' }
          ]
        }
      ]
    }
  }

  _handleSuccess(project) {
    this.context.container.refresh('expenses')
    this.context.modal.pop()
  }


}


export default New
