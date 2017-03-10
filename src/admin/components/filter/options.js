
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from './actions'
import Infinite from 'admin/components/infinite'
import Format from 'admin/utils/format'

class Options extends React.Component {

  render() {
    const { name, format, multiple, options, results } = this.props
    return (
      <div className="filter-body">
        { options.map((option, index) => {
          return (
            <div key={`filter_${index}`} className="filter-item" onClick={ this._handleChoose.bind(this, option.value, option.text) }>
              <div className="filter-item-label">
                <Format {...option.record} format={format} value={option.text} />
              </div>
              { option.description &&
                <div className="filter-item-description">
                  { option.description }
                </div>
              }
              <div className="filter-item-icon">
                { this._checked(name, multiple, results, option) ? <i className="green check icon" /> : null }
              </div>
            </div>
          )
        }) }
      </div>
    )
  }

  _checked(name, multiple, results, option) {
    if(multiple) {
      return results[name] && _.find(results[name], { key: option.value })
    } else {
      return results[name] && results[name].key == option.value
    }
  }

  _handleChoose(key, value) {
    const { name, multiple, results } = this.props
    let values = null
    if(multiple) {
      values = results[name] || []
      values = _.find(values, { key }) ? _.filter(values, item => (item.key !== key)) : [ ...values, { key, value } ]
    } else {
      if(!results[name] || results[name].key !== key) {
        values = { key, value }
      }
    }
    this.props.onUpdate(name, values)
  }

}

const mapStateToProps = state => ({
  results: state.filter.results
})

const mapDispatchToProps = {
  onUpdate: actions.update
}

Options = connect(mapStateToProps, mapDispatchToProps)(Options)

class Dynamic extends React.Component {

  render() {
    const { records } = this.props
    return (records) ? <Options { ...this._getOptions() } /> : null
  }

  _getOptions() {
    const { format, multiple, name, records, text, value } = this.props
    const options = records.map(record => {
      return { value: _.get(record, value), text: _.get(record, text), record }
    })
    return {
      name,
      format,
      multiple,
      options
    }
  }

}

class Container extends React.Component {

  constructor(props) {
    super(props)
    this._handleLookup = _.throttle(value => {
      this.props.onLookup(value)
    }, 500)
  }

  render() {
    const { endpoint, label, query } = this.props
    if(endpoint) {
      return (
        <div className="filter-search">
          <div className="filter-search-form ui form">
            <div className="filter-search-input">
              <i className="search icon" />
              <input type="text" placeholder={`Find a ${label}...`} onChange={ this._handleType.bind(this) } ref="results" value={query} />
              { query.length > 0 && <i className="remove circle icon" onClick={ this._handleAbort.bind(this) } /> }
            </div>
          </div>
          <Infinite {...this._getInfinite()}>
            <Dynamic {...this.props} />
          </Infinite>
        </div>

      )
    } else {
      return <Options {...this.props} />
    }
  }

  _getInfinite() {
    const { endpoint, sort, q } = this.props
    return {
      endpoint,
      filter: {
        q
      },
      sort
    }
  }

  _handleType(event) {
    this.props.onType(event.target.value)
    this._handleLookup(event.target.value)
  }

  _handleAbort() {
    this.props.onAbort()
  }

}

export default Container
