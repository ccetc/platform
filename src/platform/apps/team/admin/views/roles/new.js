import React from 'react'
import Form from 'admin/components/form'
import Access from '../../components/access'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Role',
      method: 'post',
      action: '/admin/team/roles',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield' },
            { label: 'Description', name: 'description', type: 'textfield' },
            { label: 'Access', name: 'access_ids', type: Access }
          ]
        }
      ]
    }
  }

}

export default New
