import React from 'react'
import Form from 'ui/components/form'

class New extends React.Component {

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New User',
      successMessage: 'This user was successfully created',
      fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield', placeholder: 'First Name' },
        { label: 'Last Name', name: 'last_name', type: 'textfield', placeholder: 'Last Name' },
        { label: 'Email', name: 'email', type: 'textfield', placeholder: 'Email' },
        { label: 'Phone', name: 'phone', type: 'textfield', placeholder: 'Phone' }
      ]
    }
  }

}

export default New
