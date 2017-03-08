import React from 'react'
import Form from 'admin/components/form'

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
      successMessage: 'Your account was successfully updated',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'First Name', required: true },
            { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Last Name', required: true },
            { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Email', required: true },
            { label: 'Photo', name: 'photo_id', type: 'filefield', multiple: false }
          ]
        }
      ]
    }
  }

}

export default Edit
