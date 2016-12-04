import React from 'react'
import Form from 'ui/components/form'

class Edit extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit User',
      method: 'patch',
      endpoint: `/admin/users/${this.context.chrome.params.id}`,
      action: `/admin/users/${this.context.chrome.params.id}`,
      onCancel: this.context.modal.close,
      onSuccess: this.context.modal.close,
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'First Name' },
            { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Last Name' },
            { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Email' }
          ]
        }
      ]
    }
  }

}

export default Edit
