import React from 'react'
import Form from 'admin/components/form'

class Member extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Member',
      method: 'patch',
      endpoint: `/admin/expenses/projects/${this.context.container.params.id}/members/${this.props.member_id}`,
      action: `/admin/expenses/projects/${this.context.container.params.id}/members/${this.props.member_id}`,
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'User', name: 'user.full_name', type: 'text' },
            { label: 'Type', name: 'member_type_id', type: 'select', options: [ { value: 1, text: 'Owner' }, { value: 2, text: 'Approver' }, { value: 3, text: 'Member' }] },
            { label: 'Is Active', name: 'is_active', type: 'checkbox', defaultValue: true }
          ]
        }
      ]
    }
  }

  _handleSuccess(project) {
    this.context.container.refresh('members')
    this.context.modal.pop()
  }

}

export default Member
