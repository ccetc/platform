import React from 'react'
import Form from 'admin/components/form'
import moment from 'moment'

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
      title: 'Edit Trip',
      method: 'patch',
      endpoint: `/admin/expenses/trips/${this.context.container.params.id}/edit`,
      action: `/admin/expenses/trips/${this.context.container.params.id}`,
      onCancel: this.context.modal.pop,
      onSuccess: this._onSuccess.bind(this),
      sections: [
        {
          fields: [
            { label: 'Project', name: 'project_id', type: 'lookup', endpoint: '/admin/expenses/memberships', value: 'id', text: 'title' },
            { label: 'Date', name: 'date', type: 'datefield', required: true, defaultValue: moment().format('YYYY-MM-DD') },
            { label: 'Description', name: 'description', type: 'textfield', required: true },
            { label: 'Time Leaving', name: 'time_leaving', type: 'textfield', required: true, placeholder: 'Time Leaving' },
            { label: 'Time Arriving', name: 'time_arriving', type: 'textfield', required: true, placeholder: 'Time Arriving' },
            { label: 'Odometer Start', name: 'odometer_start', type: 'textfield', required: true, placeholder: 'Odometer Start' },
            { label: 'Odometer End', name: 'odometer_end', type: 'textfield', required: true, placeholder: 'Odometer End' },
            { label: 'Distance', name: 'total_miles', type: 'textfield', required: true, placeholder: 'Total Miles' }
          ]
        }
      ]
    }
  }

  _onSuccess() {
    this.context.container.refresh('trip')
    this.context.modal.pop()
  }

}

export default Edit
