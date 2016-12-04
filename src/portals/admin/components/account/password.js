import React from 'react'
import Form from 'ui/components/form'

class Password extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Change Password',
      method: 'patch',
      endpoint: '/admin/account/password',
      action: '/admin/account/password',
      onCancel: this.context.modal.close,
      onSuccess: this.context.modal.close,
      sections: [
        {
          fields: [
            { label: 'Old Password', name: 'old_password', type: 'password', placeholder: 'Old Password' },
            { label: 'New Password', name: 'new_password', type: 'password', placeholder: 'New Password' },
            { label: 'Confirm Password', name: 'confirm_password', type: 'password', placeholder: 'Confirm Password' }
          ]
        }
      ]
    }
  }

}

export default Password
