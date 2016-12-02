import React from 'react'
import Form from 'ui/components/form'

class Password extends React.Component {

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Change Password',
      fields: [
        { label: 'Old Password', name: 'old_password', type: 'password', placeholder: 'Old Password' },
        { label: 'New Password', name: 'new_password', type: 'password', placeholder: 'New Password' },
        { label: 'Confirm Password', name: 'confirm_password', type: 'password', placeholder: 'Confirm Password' }
      ]
    }
  }

}

export default Password
