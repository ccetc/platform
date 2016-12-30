import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import _ from 'lodash'

class Select extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  render() {
    const { name, label, options, query } = this.props
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
        <div className="filter-body">
          { options.map((option, index) => {
            return (
              <div key={`filter_${index}`} className="filter-item">
                {option.value}
                { _.includes(query[name]['$in'], option.key) ? <i className="green check icon" /> : null }
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

const mapStateToProps = state => ({
  query: state.filter.query
})

const mapDispatchToProps = {
  onBack: actions.back,
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Select)
