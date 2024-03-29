import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import Options from './options'

class Select extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  static propTypes = {
    endpoint: React.PropTypes.string,
    sort: React.PropTypes.object
  }

  static defaultProps = {
    sort: {
      key: 'created_at',
      order: 'desc'
    }
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
        <Options {...this.props} />
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
  query: state.filter.query,
  q: state.filter.q
})

const mapDispatchToProps = {
  onBack: actions.back,
  onAbort: actions.abort,
  onType: actions.type,
  onLookup: actions.lookup,
  onUpdate: actions.update,
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Select)
