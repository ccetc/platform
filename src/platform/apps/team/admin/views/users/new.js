import React from 'react'
import Form from 'admin/components/form'
import Roles from '../../components/roles'

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
      action: '/admin/team/users',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
            { label: 'Last Name', name: 'last_name', type: 'textfield', required: true },
            { label: 'Email', name: 'email', type: 'textfield', required: true },
            { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', multiple: false },
            { label: 'Roles', name: 'role_ids', type: Roles }
          ]
        }
      ]
    }
  }

}

export default New
