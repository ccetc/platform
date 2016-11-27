import React from 'react'
import Form from 'ui/components/form'

class New extends React.Component {

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Project',
      successMessage: 'This project was successfully created',
      fields: [
        { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Title' },
        { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Code' }
      ]
    }
  }

}

export default New
