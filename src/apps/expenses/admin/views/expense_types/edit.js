import React from 'react'
import Form from 'admin/components/form'

class Edit extends React.Component {

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Expense Type',
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield' },
            { label: 'Code', name: 'code', type: 'textfield' },
            { label: 'Description', name: 'description', type: 'textarea' }
          ]
        }
      ]
    }
  }

}

export default Edit
