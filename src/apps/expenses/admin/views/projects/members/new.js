import React from 'react'
import Form from 'admin/components/form'
import UserToken from '../../../components/user_token'

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
      title: 'Add Member',
      method: 'post',
      action: `/admin/expenses/projects/${this.context.container.params.id}/members`,
      onCancel: this.context.modal.pop,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'User', name: 'user_id', type: 'lookup', prompt: 'Find a User', endpoint: `/admin/expenses/projects/${this.context.container.params.id}/members/unassigned`, value: 'id', text: 'full_name', format: UserToken },
            { label: 'Type', name: 'member_type_id', type: 'select', options: [ { key: 1, value: 'Owner' }, { key: 2, value: 'Approver' }, { key: 3, value: 'Member' }] }
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
