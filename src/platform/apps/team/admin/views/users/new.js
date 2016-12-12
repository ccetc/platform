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
      title: 'New User',
      method: 'post',
      action: '/admin/users',
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

export default New
