import React from 'react'
import Form from 'portals/admin/components/form'

class Edit extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Account',
      method: 'patch',
      endpoint: '/admin/account',
      action: '/admin/account',
      onCancel: this.context.modal.close,
      onSuccess: this.context.modal.close,
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'First Name' },
            { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Last Name' },
            { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Email' },
            { label: 'Phone', name: 'phone', type: 'textfield', placeholder: 'Phone' }
          ]
        }
      ]
    }
  }

}

export default Edit
