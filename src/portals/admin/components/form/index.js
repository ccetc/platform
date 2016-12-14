import React from 'react'
import _ from 'lodash'
import component from 'portals/admin/components/component'
import { getDefaults, collectData } from './utils'
import * as actions from './actions'
import Section from './section'

class Form extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object
  }

  static propTypes = {
    cid: React.PropTypes.string,
    action: React.PropTypes.string,
    data: React.PropTypes.object,
    errors: React.PropTypes.object,
    method: React.PropTypes.string,
    fields: React.PropTypes.array,
    redirect: React.PropTypes.string,
    status: React.PropTypes.string,
    title: React.PropTypes.string,
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
    onFailure: (error) => {},
    onSuccess: (entity) => {}
  }

  render() {
    const { title, instructions, status, sections, data, errors } = this.props
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
                                onUpdateData={this._handleUpdateData.bind(this)} />
              })}
            </div> :
            <div className="ui active centered inline loader" />
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { cid, sections, onSetSections } = this.props
    onSetSections(cid, sections)
  }

  componentDidUpdate(prevProps) {
    const { entity, status } = this.props
    if(prevProps.status !== status) {
      if(status === 'configured') {
        this._handleLoadData()
      } else if(status === 'validated') {
        this._handleSubmit()
      } else if(status === 'success') {
        this._handleSuccess(entity)
      } else if(status === 'failure') {
        this._handleFailure()
      }
    }
  }

  _handleLoadData() {
    const { cid, endpoint, sections, onFetchData, onSetData } = this.props
    if(endpoint) {
      onFetchData(cid, endpoint)
    } else {
      const data = getDefaults(sections)
      onSetData(cid, data)
    }
  }

  _handleUpdateData(key, value) {
    const { cid, onUpdateData } = this.props
    onUpdateData(cid, key, value)
  }

  _handleSubmit() {
    const { cid, action, data, method, sections, onSubmit, onSubmitForm } = this.props
    let filtered = collectData(sections, data)
    if(action) {
      onSubmitForm(cid, method, action, filtered)
    } else if(onSubmit) {
      if(onSubmit(filtered)) {
        this._handleSuccess()
      } else {
        this._handleFailure()
      }
    } else {
      this._handleSuccess()
    }
  }

  _handleSuccess(entity) {
    const message = 'Your form was successfully saved!'
    this.context.flash.set('success', message)
    this.props.onSuccess(entity)
  }

  _handleFailure() {
    const message = 'There were problems with your data'
    this.context.flash.set('error', message)
    this.props.onFailure()
  }

  _handleCancel() {
    this.props.onCancel()
  }

}

const mapStateToProps = (state, props) => {
  return {
    data: state.form[props.identifier].data,
    entity: state.form[props.identifier].entity,
    errors: state.form[props.identifier].errors,
    status: state.form[props.identifier].status
  }
}

const mapDispatchToProps = {
  onSetSections: actions.setSections,
  onFetchData: actions.fetchData,
  onSetData: actions.setData,
  onSubmitForm: actions.submitForm,
  onUpdateData: actions.updateData
}

export default component(mapStateToProps, mapDispatchToProps, Form, 'form', false)
