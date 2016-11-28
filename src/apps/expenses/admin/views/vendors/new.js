import React from 'react'
import Form from 'ui/components/form'

class New extends React.Component {

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Vendor',
      successMessage: 'This vendor was successfully created',
      fields: [
        { label: 'Name', name: 'name', type: 'textfield', placeholder: 'Name' }
      ]
    }
  }

}

export default New
