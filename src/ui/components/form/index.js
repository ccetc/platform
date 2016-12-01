import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import mapFields from './map_fields'
import * as actions from './actions'
import Section from './section'

class Form extends React.Component {

  static contextTypes = {
    session: React.PropTypes.object
  }

  static propTypes = {
    action: React.PropTypes.string,
    data: React.PropTypes.object,
    errors: React.PropTypes.object,
    method: React.PropTypes.string,
    fields: React.PropTypes.array,
    redirect: React.PropTypes.string,
    status: React.PropTypes.string,
    title: React.PropTypes.string,
    successMessage: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onChangeField: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onFailure: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    onValidateForm: React.PropTypes.func,
    onResetForm: React.PropTypes.func,
    onUpdateData: React.PropTypes.func
  }

  static defaultProps = {
    method: 'GET',
    onChange: () => {},
    onChangeField: () => {},
    onSubmit: () => {},
    onFailure: () => {},
    onSuccess: () => {}
  }

  render() {
    const { title, instructions, status, sections, data, errors } = this.props
    const { onUpdateData } = this.props
    let formClasses = ['ui', 'form', status]
    if(_.includes(['pending', 'submitting'], status)) {
      formClasses.push('loading')
    }
    return (
      <div className="form">
        <div className="form-header">
          <div className="form-header-cancel">
            <a onClick={ this._handleCancel.bind(this) }>
              Cancel
            </a>
          </div>
          <div className="form-header-title">
            { title }
          </div>
          <div className="form-header-proceed">
            <a onClick={ this._handleSubmit.bind(this) }>
              Save
            </a>
          </div>
        </div>
        <div className="form-body">
          { status !== 'loading' ?
            <div className={formClasses.join(' ')} ref="form">
              { instructions &&
                <div className="instructions">{instructions}</div>
              }
              { sections.map((section, index) => {
                return <Section {...section}
                                data={data}
                                errors={errors}
                                key={`section_${index}`}
                                onUpdateData={onUpdateData} />
              })}
            </div> :
            <div className="ui active centered inline loader" />
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    if(this.props.endpoint) {
      this._handleFetchData()
    } else {
      this._handleSetReady()
    }
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(prevProps.status !== status) {
      if(status === 'validated') {
        this._handleSubmit()
      } else if(status === 'success') {
        this._handleSuccess()
      } else if(status === 'failure') {
        this._handleFailure()
      }
    }
  }

  _handleSetReady() {
    this.props.onSetReady()
  }

  _handleFetchData() {
    this.props.onFetchData(this.props.endpoint)
  }

  _handleSubmit() {
    const { method, action, onSubmit, onSubmitForm } = this.props
    let data = this._collectData()
    if(action) {
      onSubmitForm(method, action, data)
    } else if(onSubmit) {
      if(onSubmit(data)) {
        this._handleSuccess()
      } else {
        this._handleFailure()
      }
    } else {
      this._handleSuccess()
    }
  }

  _handleSuccess() {
    const message = this.props.successMessage || 'Your form was successfully saved!'
    this.context.session.setFlash('success', message)
    this.props.onSuccess()
  }

  _handleFailure() {
    const message = this.props.successMessage || 'There were problems with your data'
    this.context.session.setFlash('error', message)
    this.props.onFailure()
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _collectData() {
    const { sections, data } = this.props
    let entity = {}
    mapFields(sections, (field) => {
      if(field.include !== false) {
        entity[field.name] = data[field.name]
      }
    })
    return entity
  }

}

const mapStateToProps = state => ({
  data: state.form.data,
  errors: state.form.errors,
  status: state.form.status
})

const mapDispatchToProps = {
  onFetchData: actions.fetchData,
  onSetReady: actions.setReady,
  onSubmitForm: actions.submitForm,
  onUpdateData: actions.updateData
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
