import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import pluralize from 'pluralize'
import { connect } from 'react-redux'
import * as actions from './actions'
import Format from 'portals/admin/utils/format'
import Filter from '../filter'

class Table extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object,
    tray: React.PropTypes.object
  }

  render() {
    const { columns, empty, entity, filters, records, sort, status } = this.props
    if(records.length > 0) {
      return (
        <div className="collection-layout">
          <div className="collection-header">
            <div className="collection-filters">
              <span className="ui small basic button"><i className="remove icon" /> Sharon Anderson</span>
              <span className="ui small basic button"><i className="remove icon" /> Greg Kops</span>
              { filters &&
                <a onClick={ this.context.tray.open.bind(this, <Filter filters={filters} />) } className="ui small basic button"><i className="plus icon" /> Add Filter</a>
              }
            </div>
          </div>
          <div className="table">
            <div className="table-head">
              <div className="table-row">
                {columns.map((column, index) => {
                  const classes = (column.primary) ? 'table-header mobile' : 'table-header'
                  return (
                    <div key={ `fixed_header_${index}` } className={ classes } onClick={ this._handleSort.bind(this, column.key) }>
                      { column.label }
                      { (sort.key == column.key) && ((sort.order == 'asc') ? <i className="chevron up icon" /> : <i className="chevron down icon" />) }
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="table-body">
              {records.map((record, recordIndex) => {
                return (
                  <div key={ `record_${recordIndex}` } className="table-row">
                    {columns.map((column, columnIndex) => {
                      const value = _.get(record, column.key)
                      const classes = (column.primary) ? 'table-cell mobile' : 'table-cell'
                      return (
                        <div key={ `cell_${recordIndex}_${columnIndex}` } className={ classes }>
                          <Format {...record} format={column.format} value={value} />
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
          { status === 'loading' &&
            <div className="chrome-infinite-loader">
              <div className="ui active inverted dimmer">
                <div className="ui small loader"></div>
              </div>
            </div>
          }
        </div>
      )
    } else if(status === 'completed' && records.length === 0) {
      return (
        <div className="table-empty">
          <div className="table-empty-message">
            <h2><i className={`circular ${empty.icon} icon`} /></h2>
            <h3>No {_.startCase(pluralize(entity.replace('_', ' ')))}</h3>
            <p>You have not yet created any {pluralize(entity.replace('_', ' '))}.</p>
            { empty.modal && <div className="ui basic button red" onClick={ this._handleAddNew.bind(this)}><i className="plus icon" /> Create New {_.startCase(entity.replace('_', ' '))}</div> }
          </div>
        </div>
      )
    } else if(status === 'loading') {
      return (
        <div className="chrome-loader">
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  componentDidMount() {
    this._resizeColumns()
  }

  componentDidUpdate() {
    this._resizeColumns()
  }

  _resizeColumns() {
    $(this.refs.body).find('.table-row:first').find('.table-cell').each((index, el) => {
      const width = $(el).css('width')
      $(this.refs.head).find(`.table-row .table-header:nth-child(${index+1})`).css('width', width)
    })
  }

  _handleSort(key) {
    const { cid, onSort } = this.props
    onSort(cid, key)
  }

  _handleAddNew() {
    this.context.modal.push(this.props.empty.modal)
  }

}

const mapStateToProps = (state, props) => ({
  sort: state.collection[props.cid].params.sort
})

const mapDispatchToProps = {
  onSort: actions.sort
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
