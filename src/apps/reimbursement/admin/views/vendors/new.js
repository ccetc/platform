import React from 'react'
import Form from 'portals/admin/components/form'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Vendor',
      method: 'post',
      action: '/admin/reimbursement/vendors',
      onCancel: this.context.modal.close,
      onSuccess: this.context.modal.close,
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Name' }
          ]
        }
      ]
    }
  }

}

export default New
