import React from 'react'
import pluralize from 'pluralize'
import _ from 'lodash'
import Table from '../table'

class Results extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const { all, columns, empty, entity, records, status } = this.props
    if(status === 'completed' && all === 0) {
      return (
        <div className="table-empty">
          <div className="table-empty-message">
            <h2><i className={`circular ${empty.icon} icon`} /></h2>
            <h3>No { _.startCase(pluralize(entity.replace('_', ' '))) }</h3>
            <p>You have not yet created any { pluralize(entity.replace('_', ' ')) }</p>
            { empty.modal &&
              <div className="ui basic button red" onClick={ this._handleAddNew.bind(this)}>
                <i className="plus icon" />
                Create New {_.startCase(entity.replace('_', ' '))}
              </div>
            }
          </div>
        </div>
      )
    } else if(status === 'loading' && records.length === 0) {
      return (
        <div className="chrome-loader">
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
        </div>
      )
    } else if(status === 'completed' && records.length === 0) {
      return (
        <div className="table-empty">
          <div className="table-empty-message">
            <h2><i className="circular remove icon" /></h2>
            <h3>No Results Found</h3>
            <p>No records matched your query</p>
          </div>
        </div>
      )
    } else if(columns) {
      return <Table { ...this._getTable() } />
    } else {
      return null
    }
  }

  _getTable() {
    const { columns, params, records, status, onSort} = this.props
    return {
      columns,
      records,
      sort: params.sort,
      status,
      onSort
    }
  }

  _handleAddNew() {
    this.context.modal.push(this.props.empty.modal)
  }

}

export default Results
