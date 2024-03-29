import React from 'react'
import Form from 'admin/components/form'

class Edit extends React.Component {

  static contextTypes = {
    admin: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Photo',
      method: 'patch',
      endpoint: '/admin/account',
      action: '/admin/account/photo',
      successMessage: 'Your photo was successfully updated',
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', multiple: false }
          ]
        }
      ]
    }
  }

  _handleSuccess() {
    this.context.admin.reloadSession()
    this.context.modal.pop()
  }

}

export default Edit
