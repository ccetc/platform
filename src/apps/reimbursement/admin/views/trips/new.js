import React from 'react'
import Form from 'ui/components/form'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Trip',
      method: 'post',
      action: '/admin/reimbursement/trips',
      onCancel: this.context.modal.close,
      onSuccess: this.context.modal.close,
      sections: [
        {
          fields: [
            { label: 'Project', name: 'project_id', type: 'select', placeholder: 'Project', endpoint: '/admin/projects', key: 'id', value: 'title' },
            { label: 'Expense Type', name: 'expense_type_id', type: 'select', placeholder: 'Expense Type', endpoint: '/admin/expense_types', key: 'id', value: 'title' },
            { label: 'Vendor', name: 'vendor_id', type: 'select', placeholder: 'Vendor', endpoint: '/admin/vendors', key: 'id', value: 'name' },
            { label: 'Date', name: 'date_needed', type: 'datefield', placeholder: 'Date Needed' },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Description' }
          ]
        }
      ]
    }
  }

}

export default New
