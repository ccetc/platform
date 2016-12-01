import React from 'react'
import Form from 'ui/components/form'

class New extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Advance',
      method: 'post',
      action: '/admin/expenses/advances',
      onCancel: this.context.chrome.closeModal,
      onSuccess: this.context.chrome.closeModal,
      sections: [
        {
          fields: [
            { label: 'Project', name: 'project_id', type: 'select', placeholder: 'Project', endpoint: '/admin/projects', key: 'id', value: 'title' },
            { label: 'Expense Type', name: 'expense_type_id', type: 'select', placeholder: 'Expense Type', endpoint: '/admin/expense_types', key: 'id', value: 'title' },
            { label: 'Vendor', name: 'vendor_id', type: 'select', placeholder: 'Vendor', endpoint: '/admin/vendors', key: 'id', value: 'name' },
            { label: 'Delivery Method', name: 'delivery_method', type: 'textfield', placeholder: 'Delivery Method' },
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Code' },
            { label: 'Date Needed', name: 'date_needed', type: 'datefield', placeholder: 'Date Needed' },
            { label: 'Amount', name: 'amount', type: 'textfield', placeholder: 'Amount' },
            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Description' }
          ]
        }
      ]
    }
  }

}

export default New
