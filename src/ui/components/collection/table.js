import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from './actions'
import Format from 'ui/utils/format'

class Table extends React.Component {

  render() {
    const { columns, records, sort, status } = this.props
    return (
      <div className="collection-layout">
        <div className="table-fixed" ref="head">
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
        </div>
        <div className="table-scroll">
          <div className="table" ref="body">
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
          { status === 'loading' && <div className="loading">Loading...</div> }
        </div>
      </div>
    )
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
    this.props.onSort(key)
  }

}

const mapStateToProps = state => ({
  sort: state.collection.params.sort
})

const mapDispatchToProps = {
  onSort: actions.sort
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
