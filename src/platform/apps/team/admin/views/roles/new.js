import React from 'react'
import Form from 'portals/admin/components/form'
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
      action: '/admin/roles',
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Tile' },
            { label: 'Description', name: 'description', type: 'textfield', placeholder: 'Description' },
            { label: 'Access', name: 'description', type: Access }
          ]
        }
      ]
    }
  }

}

export default New