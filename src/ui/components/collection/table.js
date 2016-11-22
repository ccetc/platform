import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from './actions'

class Table extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      top: null,
      fixed: false
    }
  }

  render() {
    const { fixed, top } = this.state
    const { columns, records, sort } = this.props
    return (
      <div>
        { fixed &&
          <div className="table-fixed" style={{ top }}>
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
            </div>
          </div>
        }
        <div className="table">
          <div className="table-head" ref="head">
            <div className="table-row">
              {columns.map((column, index) => {
                const classes = (column.primary) ? 'table-header mobile' : 'table-header'
                return (
                  <div key={ `header_${index}` } className={ classes } onClick={ this._handleSort.bind(this, column.key) }>
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
                    return <div key={ `cell_${recordIndex}_${columnIndex}` } className={ classes }>{ value }</div>
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._attachScrollListener()
  }

  componentWillUnmount() {
    this._detachScrollListener()
  }

  _handleSort(key) {
    this.props.onSort(key)
  }

  _container() {
    return ReactDOM.findDOMNode(this).parentNode.parentNode.parentNode
  }

  _head() {
    return ReactDOM.findDOMNode(this.refs.head)
  }

  _attachScrollListener() {
    const container = this._container()
    container.addEventListener('scroll', this._scrollListener.bind(this), true)
    container.addEventListener('resize', this._scrollListener.bind(this), true)
    this._scrollListener()
  }

  _detachScrollListener() {
    const container = this._container()
    container.removeEventListener('scroll', this._scrollListener.bind(this), true)
    container.removeEventListener('resize', this._scrollListener.bind(this), true)
  }

  _scrollListener() {
    const container = this._container()
    const head = this._head()
    const headTop = head.offsetTop - container.offsetTop
    this.setState({
      fixed: (container.scrollTop >= headTop),
      top: container.offsetTop
    })
  }

}

const mapStateToProps = state => ({
  sort: state.collection.params.sort
})

const mapDispatchToProps = {
  onSort: actions.sort
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
