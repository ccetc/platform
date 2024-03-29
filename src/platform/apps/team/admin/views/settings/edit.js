import React from 'react'
import Form from 'admin/components/form'
import Access from '../../components/access'

class Edit extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Role',
      method: 'patch',
      endpoint: `/admin/team/roles/${this.props.id}`,
      action: `/admin/team/roles/${this.props.id}`,
      onCancel: this.context.modal.pop,
      onSuccess: this.context.modal.pop,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield' },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Access', name: 'description', type: Access }
          ]
        }
      ]
    }
  }

}

export default Edit
