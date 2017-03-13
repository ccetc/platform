import React from 'react'
import Form from 'admin/components/form'
import moment from 'moment'

class Edit extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Expense',
      method: 'patch',
      endpoint: `/admin/expenses/expenses/${this.context.container.params.id}/edit`,
      action: `/admin/expenses/expenses/${this.context.container.params.id}`,
      onCancel: this.context.modal.pop,
      onSuccess: this._onSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'Receipt', name: 'receipt_id', type: 'filefield', prompt: 'Upload Receipt' },
            { label: 'Date', name: 'date', type: 'datefield', placeholder: 'Date Needed', defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Project', name: 'project_id', type: 'lookup', endpoint: '/admin/expenses/memberships', value: 'id', text: 'title' },
            { label: 'Vendor', name: 'vendor_id', type: 'lookup', endpoint: '/admin/expenses/vendors', value: 'id', text: 'name', form: this._getVendorForm() },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Amount', name: 'amount', type: 'textfield', prefix: '$' },
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
            { label: 'Name', name: 'name', type: 'textfield' }
          ]
        }
      ]
    }
  }

  _onSuccess() {
    this.context.container.refresh('expense')
    this.context.modal.pop()
  }

}

export default Edit
