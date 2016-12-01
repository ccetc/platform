import React from 'react'
import Form from 'ui/components/form'

class Edit extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object
  }

  render() {
    return <Form {...this._getForm()} />
  }

  _getForm() {
    return {
      title: 'Edit Project',
      method: 'patch',
      endpoint: `/admin/expenses/projects/${this.context.chrome.params.id}`,
      action: `/admin/expenses/projects/${this.context.chrome.params.id}`,
      onCancel: this.context.chrome.closeModal,
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
    // this.context.container.refresh()
    this.context.chrome.closeModal()
    this.context.chrome.transitionTo(`/admin/expenses/projects/${project.id}`)
  }

}

export default Edit
