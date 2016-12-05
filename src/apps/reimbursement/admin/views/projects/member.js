import React from 'react'
import Form from 'ui/components/form'

class Member extends React.Component {

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Add Member',
      sections: [
        {
          fields: [
            { label: 'User', name: 'user_id', type: 'select', placeholder: 'User', endpoint: '/admin/users', key: 'id', value: 'full_name' }
          ]
        }
      ]
    }
  }

}

export default Member
