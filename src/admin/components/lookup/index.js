import React from 'react'
import component from 'admin/components/component'
import Format from 'admin/utils/format'
import _ from 'lodash'
import * as actions from './actions'
import Search from './search'

class Lookup extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  static propTypes = {
    active: React.PropTypes.bool
  }

  render() {
    const { chosen, disabled, format, prompt, text } = this.props
    const value = chosen ? _.get(chosen, text) : ''
    return (
      <div className="lookup-field">
        { chosen &&
          <div className="lookup-token" onClick={ this._handleBegin.bind(this) }>
            <Format {...chosen} format={format} value={value} />
          </div>
        }
        { chosen &&
          <div className="lookup-field-clear">
            <i className="icon circle remove" onClick={ this._handleClear.bind(this) } />
          </div>
        }
        { !chosen &&
          <input type="text"
                 disabled={disabled}
                 onFocus={ this._handleBegin.bind(this) }
                 value={value}
                 placeholder={ prompt } />
       }
     </div>
    )
  }

  componentDidMount() {
    const { cid, defaultValue, endpoint, onLoad } = this.props
    if(defaultValue) {
      const params = { $ids: [ defaultValue ] }
      onLoad(cid, params, endpoint)
    }
  }

  componentDidUpdate(prevProps) {
    const { active, disabled } = this.props
    if(prevProps.active !== active && active) {
      const params = { $filter: { q: '' }, $sort: this.props.sort }
      this.props.onLookup(this.props.cid, params, this.props.endpoint)
      this.context.modal.push(<Search {...this.props} />)
    } else if(prevProps.disabled !== disabled) {
      this.props.onClear()
    }
  }

  _handleBegin(e) {
    this.props.onBegin()
    e.target.blur()
    e.preventDefault()
    return false
  }

  _handleClear() {
    this.props.onClear()
    this.props.onChange()
  }

}

const mapStateToProps = (state, props) => ({
  active: state.lookup[props.cid].active,
  chosen: state.lookup[props.cid].chosen,
  selected: state.lookup[props.cid].selected,
  results: state.lookup[props.cid].results
})

const mapDispatchToProps = {
  onBegin: actions.begin,
  onClear: actions.clear,
  onLoad: actions.load,
  onLookup: actions.lookup
}

export default component(mapStateToProps, mapDispatchToProps, Lookup, 'lookup', true)
