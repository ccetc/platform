import React from 'react'
import Form from 'ui/components/form'

class New extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Vendor',
      method: 'post',
      action: '/admin/expenses/vendors',
      onCancel: this.context.chrome.closeModal,
      onSuccess: this.context.chrome.closeModal,
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
