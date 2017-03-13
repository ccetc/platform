import React from 'react'
import pluralize from 'pluralize'
import Form from 'admin/components/form'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    const { type, id, onSuccess } = this.props
    return {
      title: `Reject ${type}`,
      method: 'patch',
      action: `/admin/expenses/approvals/${pluralize(type)}/${id}/reject`,
      onCancel: this.context.modal.pop,
      onSuccess: () => {
        onSuccess()
        this.context.modal.pop()
      },
      sections: [
        {
          fields: [
            { label: 'Why are you rejecting this expense?', name: 'reason_rejected', type: 'textarea' }
          ]
        }
      ]
    }
  }

}

export default New
