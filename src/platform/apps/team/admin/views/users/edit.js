import React from 'react'
import Form from 'admin/components/form'
import Roles from '../../components/roles'

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
      title: 'Edit User',
      method: 'patch',
      endpoint: `/admin/team/users/${this.context.container.params.id}`,
      action: `/admin/team/users/${this.context.container.params.id}`,
      onCancel: this.context.modal.pop,
      onSuccess: () => {
        this.context.container.refresh(['user','access']),
        this.context.modal.pop()
      },
      sections: [
        {
          fields: [
            { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
            { label: 'Last Name', name: 'last_name', type: 'textfield', required: true },
            { label: 'Email', name: 'email', type: 'textfield', required: true },
            { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', multiple: false },
            { label: 'Is Active', name: 'is_active', type: 'checkbox', defaultValue: true },
            { label: 'Roles', name: 'role_ids', type: Roles }
          ]
        }
      ]
    }
  }

}

export default Edit
