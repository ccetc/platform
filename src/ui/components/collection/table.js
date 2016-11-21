import React from 'react'
import ReactDOM from 'react-dom'

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
    const { records } = this.props
    return (
      <div>
        { fixed &&
          <div className="table-fixed" style={{ top }}>
            <div className="table">
              <div className="table-head">
                <div className="table-row">
                  <div className="table-header mobile">Name <i className="chevron down icon" /></div>
                  <div className="table-header">Email</div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="table">
          <div className="table-head" ref="head">
            <div className="table-row">
              <div className="table-header mobile">Name <i className="chevron down icon" /></div>
              <div className="table-header">Email</div>
            </div>
          </div>
          <div className="table-body">
            {records.map((record, index) => {
              return (
                <div className="table-row" key={`record_${index}`}>
                  <div className="table-cell mobile">{record.full_name}</div>
                  <div className="table-cell">{record.email}</div>
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

export default Table
