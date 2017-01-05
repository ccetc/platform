
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from './actions'
import Infinite from 'portals/admin/containers/infinite'

class Options extends React.Component {

  render() {
    const { name, multiple, options, query } = this.props
    return (
      <div className="filter-body">
        { options.map((option, index) => {
          return (
            <div key={`filter_${index}`} className="filter-item" onClick={ this._handleChoose.bind(this, option.value, option.text) }>
              <div className="filter-item-label">
                { option.text }
              </div>
              { option.description &&
                <div className="filter-item-description">
                  { option.description }
                </div>
              }
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
    if(multiple) {
      return query[name] && _.find(query[name], { key: option.value })
    } else {
      return query[name] && query[name].key == option.value
    }
  }

  _handleChoose(key, value) {
    const { name, multiple, query } = this.props
    let values = null
    if(multiple) {
      values = query[name] || []
      values = _.find(values, { key }) ? _.filter(values, item => (item.key !== key)) : [ ...values, { key, value } ]
    } else {
      if(!query[name] || query[name].key !== key) {
        values = { key, value }
      }
    }
    this.props.onUpdate(name, values)
  }

}

const mapStateToProps = state => ({
  query: state.filter.query
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
    const { name, multiple, records, text, value } = this.props
    const options = records.map(record => {
      return { value: _.get(record, value), text: _.get(record, text) }
    })
    return {
      name,
      multiple,
      options
    }
  }

}

class Container extends React.Component {

  render() {
    const { endpoint, label } = this.props
    if(endpoint) {
      return (
        <div className="filter-search">
          <div className="filter-search-form ui form">
            <div className="filter-search-input">
              <i className="search icon" />
              <input type="text" placeholder={`Find a ${label}...`} onChange={this._handleLookup.bind(this)} ref="query" />
              <i className="remove circle icon" />
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
    const { endpoint } = this.props
    return {
      endpoint
    }
  }

  _handleLookup(event) {
    // this.props.onLookup(this.props.cid,event.target.value, this.props.endpoint)
  }

}

export default Container
