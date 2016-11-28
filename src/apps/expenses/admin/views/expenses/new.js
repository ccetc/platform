import React from 'react'
import Form from 'ui/components/form'

class New extends React.Component {

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Expense',
      successMessage: 'This expense was successfully created',
      fields: [
        { label: 'User', name: 'user_id', type: 'select', placeholder: 'User', endpoint: '/admin/users', key: 'id', value: 'full_name' },
        { label: 'Project', name: 'project_id', type: 'select', placeholder: 'Project', endpoint: '/admin/projects', key: 'id', value: 'title' },
        { label: 'Expense Type', name: 'expense_type_id', type: 'select', placeholder: 'Expense Type', endpoint: '/admin/expense_types', key: 'id', value: 'title' },
        { label: 'Vendor', name: 'vendor_id', type: 'select', placeholder: 'Vendor', endpoint: '/admin/vendors', key: 'id', value: 'name' },
        { label: 'Date', name: 'date_needed', type: 'datefield', placeholder: 'Date Needed' },
        { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Description' },
        { label: 'Amount', name: 'amount', type: 'textfield', placeholder: 'Amount' },
        { label: 'Visa?', name: 'is_visa', type: 'checkbox' }
      ]
    }
  }

}

export default New
