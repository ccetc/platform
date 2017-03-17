import React from 'react'
import component from 'admin/components/component'
import Form from 'admin/components/form'
import Format from 'admin/utils/format'
import $ from 'jquery'
import _ from 'lodash'
import * as actions from './actions'

class Search extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this._handleLookup = _.throttle((cid, params, endpoint) => {
      this.props.onLookup(cid, params, endpoint)
    }, 500)
  }

  render() {
    const { label, results, status, selected, text, form, format } = this.props
    return (
      <div className="chrome-modal-panel">
       <div className="chrome-modal-panel-header">
         <div className="chrome-modal-panel-header-cancel" onClick={ this._handleCancel.bind(this) }>
           <i className="chevron left icon" />
           Cancel
         </div>
         <div className="chrome-modal-panel-header-title">
           Choose {label}
         </div>
         <div className="chrome-modal-panel-header-proceed" />
       </div>
       <div className="lookup-panel">
         <div className="lookup-panel-search">
           <div className="ui form">
             <input type="text" placeholder={`Find a ${label}...`} onChange={this._handleType.bind(this)} ref="query" />
           </div>
         </div>
         { status === 'loading' &&
           <div className="lookup-panel-loader">
             <div className="chrome-loader">
               <div className="ui active inverted dimmer">
                 <div className="ui large text loader">Loading</div>
               </div>
             </div>
           </div>
         }
         { status === 'success' && results.length === 0 &&
           <div className="lookup-panel-empty">
             <div className="lookup-panel-empty-message">
               <h2><i className="circular remove icon" /></h2>
               <h3>No Results Found</h3>
               <p>No {label} match your query</p>
             </div>
           </div>
         }
         { status === 'success' && results.length > 0 &&
           <div className="lookup-panel-results">
             { results.map((result, index) => {
               const value = _.get(result, text)
               return (
                 <div key={`result_${index}`} className="lookup-panel-result" onClick={ this._handleChoose.bind(this, index) }>
                   <div className="lookup-panel-result-label">
                     <Format {...result} format={format} value={value} />
                   </div>
                   <div className="lookup-panel-result-icon">
                     { index === selected ? <i className="green check icon" /> : null }
                   </div>
                 </div>
               )
             })}
           </div>
         }
         { form &&
           <div className="lookup-panel-add">
             <div className="ui fluid blue button" onClick={ this._handleAdd.bind(this)}>
               Add {label}
             </div>
           </div>
         }
       </div>
     </div>
    )
  }

  componentDidMount() {
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

  _handleType(event) {
    const { cid, sort, endpoint } = this.props
    const q = event.target.value
    const params = { $filter: { q: event.target.value }, $sort: sort }
    this.props.onType(q)
    this._handleLookup(cid, params, endpoint)
  }

  _handleChoose(index) {
    const chosen = this.props.results[index]
    const value = _.get(chosen, this.props.value)
    this.props.onChoose(chosen, index)
    this.props.onChange(value)
    this.context.modal.pop()
  }

  _handleAdd() {
    this.context.modal.push(<Form {...this._getForm()} />)
  }

  _getForm() {
    return {
      ...this.props.form,
      onCancel: this.context.modal.pop,
      onSuccess: (chosen) => {
        const value = _.get(chosen, this.props.value)
        this.props.onChoose(chosen, 0)
        this.props.onChange(value)
        this.context.modal.pop()
        this.context.modal.pop()
      }
    }

  }

}

const mapStateToProps = (state, props) => ({
  status: state.lookup[props.cid].status,
  active: state.lookup[props.cid].active,
  selected: state.lookup[props.cid].selected,
  results: state.lookup[props.cid].results
})

const mapDispatchToProps = {
  onBegin: actions.begin,
  onCancel: actions.cancel,
  onChoose: actions.choose,
  onType: actions.type,
  onRefresh: actions.lookup
}

export default component(mapStateToProps, mapDispatchToProps, Search, 'lookup', false)
