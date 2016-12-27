import React from 'react'
import _ from 'lodash'
import component from 'portals/admin/components/component'
import * as actions from './actions'

class Lookup extends React.Component {

  static propTypes = {
    active: React.PropTypes.bool
  }

  render() {
    const { active, index, label, results } = this.props
    const chosen = (index !== null) ? results[index] : null
    return (
      <div className="lookup-field">
        <input type="text"
               onFocus={ this._handleBegin.bind(this) }
               value={ chosen ? chosen.title : '' }/>
       { active &&
         <div className="lookup-panel">
           <div className="lookup-panel-header">
             <div className="lookup-panel-header-cancel" onClick={ this._handleCancel.bind(this) }>
               Cancel
             </div>
             <div className="lookup-panel-header-title">
             </div>
           </div>
           <div className="lookup-panel-search">
             <input type="text" placeholder={`Find a ${label}...`} onChange={this._handleLookup.bind(this)} />
           </div>
           { results && !_.isEmpty(results) &&
             <div className="lookup-panel-results">
               { results.map((result, index) => {
                 return (
                   <div key={`result_${index}`} className="lookup-panel-result" onClick={ this._handleChoose.bind(this, index) }>
                     { result.title }
                   </div>
                 )
               })}
             </div>
           }
         </div>
        }
      </div>
    )
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleLookup(event) {
    this.props.onLookup(this.props.cid, event.target.value, this.props.endpoint)
  }

  _handleChoose(index) {
    this.props.onChoose(index)
  }

}

const mapStateToProps = (state, props) => ({
  active: state.lookup[props.cid].active,
  index: state.lookup[props.cid].index,
  results: state.lookup[props.cid].results
})

const mapDispatchToProps = {
  onBegin: actions.begin,
  onCancel: actions.cancel,
  onChoose: actions.choose,
  onLookup: actions.lookup
}

export default component(mapStateToProps, mapDispatchToProps, Lookup, 'lookup', false)
