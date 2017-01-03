
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
    return (this.props.records) ? <Options { ...this._getOptions() } /> : null
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
    if(this.props.endpoint) {
      return (
        <Infinite {...this._getInfinite()}>
          <Dynamic {...this.props} />
        </Infinite>
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

}

export default Container
