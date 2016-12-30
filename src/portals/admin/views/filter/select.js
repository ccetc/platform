import React from 'react'
import { connect } from 'react-redux'
import Infinite from 'portals/admin/containers/infinite'
import * as actions from './actions'
import _ from 'lodash'

class Select extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  render() {
    const { label } = this.props
    return (
      <div className="filter-panel">
        <div className="filter-header">
          <div className="filter-header-back" onClick={ this._handleBack.bind(this) }>
            <i className="chevron left icon" />
            Back
          </div>
          <div className="filter-header-title">
            { label }
          </div>
          <div className="filter-header-next" onClick={ this._handleDone.bind(this) }>
            Done
          </div>
        </div>
        <Container {...this.props} />
        <div className="filter-footer" onClick={ this._handleReset.bind(this) }>
          Reset Filter
        </div>
      </div>
    )
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.context.tray.close()
  }

  _handleReset() {
    this.props.onReset()
  }

}

class Options extends React.Component {

  render() {
    const { name, multiple, query, records, text, value } = this.props
    const options = records ? records.map(record => {
      return { value: _.get(record, value), text: _.get(record, text) }
    }) : this.props.options
    return (
      <div className="filter-body">
        { options.map((option, index) => {
          return (
            <div key={`filter_${index}`} className="filter-item" onClick={ this._handleChoose.bind(this, option.value) }>
              <div className="filter-item-label">
                {option.text}
              </div>
              <div className="filter-item-icon">
                { this._checked(name, multiple, query, option) ? <i className="green check icon" /> : null }
              </div>
            </div>
          )
        }) }
      </div>
    )
  }

  _checked(name, multiple, query, option) {
    if(multiple === true) {
      return query[name] && _.includes(query[name], option.value)
    } else {
      return query[name] === option.value
    }
  }

  _without(array, key) {
    let output = []
    array.map(item => {
      if(item !== key) {
        output.push(item)
      }
    })
    return output
  }

  _handleChoose(key) {
    const { name, multiple, query } = this.props
    let value = null
    if(multiple) {
      value = query[name] || []
      value = _.includes(value, key) ? this._without(value, key) : [ ...value, key ]
    } else {
      if(query[name] !== key) {
        value = key
      }
    }
    this.props.onUpdate(name, value)
  }

}

class Container extends React.Component {

  render() {
    return (
      <Infinite {...this._getInfinite()}>
        <Options {...this.props} />
      </Infinite>
    )
  }

  _getInfinite() {
    const { endpoint } = this.props
    return {
      endpoint
    }
  }

}

const mapStateToProps = state => ({
  query: state.filter.query
})

const mapDispatchToProps = {
  onBack: actions.back,
  onUpdate: actions.update,
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Select)
