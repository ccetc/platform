import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import _ from 'lodash'

class Panel extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }


  render() {
    const { filters, query } = this.props
    return (
      <div className="filter-panel">
        <div className="filter-header">
          <div className="filter-header-back" />
          <div className="filter-header-title">
            Filters
          </div>
          <div className="filter-header-next" onClick={ this._handleDone.bind(this) }>
            Done
          </div>
        </div>
        <div className="filter-body">
          { filters.map((filter, index) => {
            // const values = this._values(filter, query)
            // { false && values && <div className="values">{ values }</div> }
            const count = this._count(filter, query)
            return (
              <div key={`filter_${index}`} className="filter-item" onClick={ this._handleChoose.bind(this, index) }>
                <div className="filter-item-label">
                  {filter.label}
                </div>
                <div className="filter-item-values">
                  { count && <div className="label">{ count }</div> }
                </div>
                <div className="filter-item-icon">
                  <i className="chevron right icon" />
                </div>
              </div>
            )
          }) }
        </div>
        <div className="filter-footer" onClick={ this._handleReset.bind(this) }>
          Reset Filter
        </div>
      </div>
    )
  }

  _count(filter, query) {
    return query[filter.name] ? query[filter.name].length : null
  }

  _values(filter, query) {
    if(filter.multiple && query[filter.name]) {
      let values = []
      filter.options.map(option => {
        if(_.includes(query[filter.name], option.key)) {
          values.push(option.value)
        }
      })
      return values.join(', ')
    } else {
      if(query[filter.name]) {
        const option = _.find(filter.options, { key: query[filter.name] })
        if(option) {
          return option.value
        }
      }
    }
    return ''
  }

  _handleChoose(index) {
    this.props.onChoose(index)
  }

  _handleDone() {
    this.context.tray.close()
  }

  _handleReset() {
    this.props.onReset()
  }

}

const mapStateToProps = state => ({
  query: state.filter.query
})

const mapDispatchToProps = {
  onChoose: actions.choose,
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
