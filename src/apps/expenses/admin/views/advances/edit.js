import React from 'react'
import Form from 'admin/components/form'

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
      title: 'Edit Advance',
      method: 'patch',
      endpoint: `/admin/expenses/advances/${this.context.container.params.id}/edit`,
      action: `/admin/expenses/advances/${this.context.container.params.id}`,
      onCancel: this.context.modal.pop,
      onSuccess: this._onSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'Project', name: 'project_id', type: 'lookup', endpoint: '/admin/expenses/memberships', value: 'id', text: 'title' },
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

  _onSuccess() {
    this.context.container.refresh('advance')
    this.context.modal.pop()
  }

}

export default Edit
