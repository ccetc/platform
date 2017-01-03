import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import Options from './options'

class DateRange extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  render() {
    const options = []
    options.push()
    options.push({ key: 'this_week', value: 'This Week' })
    options.push({ key: 'last_week', value: 'Last Week' })
    options.push({ key: 'next_week', value: 'Next Week' })
    options.push({ key: 'this_month', value: 'This Month' })
    options.push({ key: 'last_month', value: 'Last Month' })
    options.push({ key: 'next_month', value: 'Next Month' })
    options.push({ key: 'this_quarter', value: 'This Quarter' })
    options.push({ key: 'last_quarter', value: 'Last Quarter' })
    options.push({ key: 'next_quarter', value: 'Next Quarter' })
    options.push({ key: 'this_year', value: 'This Year' })
    options.push({ key: 'last_year', value: 'Last Year' })
    options.push({ key: 'next_year', value: 'Next Year' })
    options.push({ key: 'next_year', value: 'Next Year' })
    options.push({ key: 'custom', value: 'Custom' })
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
        <Options options={ options } />
        <div className="filter-footer" onClick={ this._handleReset.bind(this) }>
          Reset { label }
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
    this.props.onReset(this.props.name)
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

export default connect(mapStateToProps, mapDispatchToProps)(DateRange)
