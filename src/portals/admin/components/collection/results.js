import React from 'react'
import pluralize from 'pluralize'
import _ from 'lodash'
import Filter from '../filter'
import Table from '../table'

class Results extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const { all, columns, empty, entity, filters, records, status } = this.props
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
    } else {
      return (
        <div className="collection">
          { filters &&
            <div className="collection-header">
              <Filter { ...this._getFilter() } />
            </div>
          }
          { status === 'loading' && records.length === 0 &&
            <div className="chrome-loader">
              <div className="ui active inverted dimmer">
                <div className="ui large text loader">Loading</div>
              </div>
            </div>
          }
          { status === 'completed' && columns && records.length > 0 && <Table { ...this._getTable() } /> }
          { status === 'completed' && records.length === 0 &&
            <div className="table-empty">
              <div className="table-empty-message">
                <h2><i className="circular remove icon" /></h2>
                <h3>No Results Found</h3>
                <p>No records matched your query</p>
              </div>
            </div>
          }
        </div>
      )
    }
  }

  _getFilter() {
    const { filters, params, onFilter } = this.props
    return {
      fields: filters,
      filters: params.filter,
      onChange: onFilter
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
