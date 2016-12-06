import React from 'react'
import Form from 'ui/components/form'

class Edit extends React.Component {

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
      title: 'Edit Project',
      method: 'patch',
      endpoint: `/admin/reimbursement/projects/${this.context.container.params.id}`,
      action: `/admin/reimbursement/projects/${this.context.container.params.id}`,
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
    this.context.container.refresh('project')
    this.context.modal.close()
    this.context.router.push(`/admin/reimbursement/projects/${project.id}`)
  }

}

export default Edit