import React from 'react'
import Form from 'admin/components/form'
import ExpenseTypeToken from '../../components/expense_type_token'

class New extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    history: React.PropTypes.object,
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
      title: 'New Advance',
      method: 'post',
      action: '/admin/expenses/advances',
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
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
            { label: 'Project', name: 'project_id', type: 'lookup', endpoint: '/admin/expenses/memberships', value: 'id', text: 'title' },
            { label: 'Expense Type', name: 'expense_type_id', type: 'lookup', placeholder: 'Expense Type', endpoint: expense_type_endpoint, value: 'id', text: 'text', disabled: expense_type_disabled, format: ExpenseTypeToken },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', endpoint: '/admin/expenses/vendors', value: 'id', text: 'name', form: this._getVendorForm() },
            { label: 'Delivery Method', name: 'delivery_method', type: 'select', placeholder: 'Delivery Method', required: true, options: [ { key: 'mail', value: 'Mail' }, { key: 'pickup', value: 'Pickup' }] },
            { label: 'Date Needed', name: 'date_needed', type: 'datefield', placeholder: 'Date Needed', required: true },
            { label: 'Amount', name: 'amount', type: 'textfield', required: true, prefix: '$' },
            { label: 'Description', name: 'description', type: 'textfield', required: true }
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
            { label: 'Name', name: 'name', type: 'textfield' }
          ]
        }
      ]
    }
  }

  _handleSuccess(advance) {
    this.context.modal.pop()
    this.context.history.push(`/admin/expenses/advances/${advance.id}`)
  }

}

export default New
