import React from 'react'
import component from 'portals/admin/components/component'
import $ from 'jquery'
import _ from 'lodash'
import * as actions from './actions'

class Search extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const { label, results, value } = this.props
    return (
     <div className="lookup-panel">
       <div className="lookup-panel-header">
         <div className="lookup-panel-header-cancel" onClick={ this._handleCancel.bind(this) }>
           <i className="chevron left icon" />
           Cancel
         </div>
         <div className="lookup-panel-header-title">
           Choose {label}
         </div>
         <div className="lookup-panel-header-proceed" />
       </div>
       <div className="lookup-panel-search">
         <div className="ui form">
          <input type="text" placeholder={`Find a ${label}...`} onChange={this._handleLookup.bind(this)} ref="query" />
         </div>
       </div>
       { results && !_.isEmpty(results) &&
         <div className="lookup-panel-results">
           { results.map((result, index) => {
             return (
               <div key={`result_${index}`} className="lookup-panel-result" onClick={ this._handleChoose.bind(this, index) }>
                 { _.get(result, value) }
               </div>
             )
           })}
         </div>
       }
     </div>
    )
  }

  componentDidMount() {
    this.props.onLookup(this.props.cid, '', this.props.endpoint)
    const query = $(this.refs.query)
    setTimeout(function() { query.focus() }, 500)

  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleCancel() {
    this.context.modal.pop()
    this.props.onCancel()
  }

  _handleLookup(event) {
    this.props.onLookup(this.props.cid,event.target.value, this.props.endpoint)
  }

  _handleChoose(index) {
    this.context.modal.pop()
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

export default component(mapStateToProps, mapDispatchToProps, Search, 'lookup', false)
