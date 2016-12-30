import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

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
            return (
              <div key={`filter_${index}`} className="filter-item" onClick={ this._handleChoose.bind(this, index) }>
                {filter.label}
                { false && query[filter.name] && query[filter.name].$in && <div className="label">{query[filter.name].$in.length}</div> }
                <i className="chevron right icon" />
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
