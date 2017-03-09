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
      title: 'Edit Photo',
      method: 'patch',
      endpoint: '/admin/account',
      action: '/admin/account',
      successMessage: 'Your photo was successfully updated',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'Photo', name: 'photo_id', type: 'filefield', prompt: 'Choose Photo', multiple: false }
          ]
        }
      ]
    }
  }

}

export default Edit
