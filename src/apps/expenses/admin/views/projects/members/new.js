import React from 'react'
import Form from 'admin/components/form'
import Avatar from 'admin/components/avatar'

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
            { label: 'User', name: 'user_id', type: 'lookup', prompt: 'Find a User', endpoint: `/admin/expenses/projects/${this.context.container.params.id}/members/unassigned`, value: 'id', text: 'full_name', format: UserFormat },
            { label: 'Type', name: 'member_type_id', type: 'select', endpoint: '/admin/expenses/member_types', value: 'id', text: 'name' }
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

const UserFormat = (props) => {
  return (
    <div>
      <Avatar user={ props } />
      <strong>{ props.first_name } { props.last_name }</strong><br />
      { props.email }
    </div>
  )
}

export default Member
