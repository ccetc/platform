import React from 'react'
import Form from 'ui/components/form'

class Edit extends React.Component {

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Project',
      successMessage: 'This project was successfully updated',
      fields: [
        { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Title' },
        { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Code' }
      ]
    }
  }

}

export default Edit
