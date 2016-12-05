import React from 'react'
import Form from 'ui/components/form'

class New extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'New Project',
      method: 'post',
      action: '/admin/expenses/projects',
      onCancel: this.context.modal.close,
      onSuccess: this._handleSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', placeholder: 'Title' },
            { label: 'Code', name: 'code', type: 'textfield', placeholder: 'Code' }
          ]
        }
      ]
    }
  }

  _handleSuccess(project) {
    this.context.modal.close()
    this.context.router.push(`/admin/expenses/projects/${project.id}`)
  }

}

export default New
