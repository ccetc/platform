import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

class Infinite extends React.Component {

  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    sort: React.PropTypes.string.isRequired,
    loaded: React.PropTypes.number.isRequired,
    records: React.PropTypes.array.isRequired,
    status: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired
  }

  render() {
    const { children, loaded, records, status, total } = this.props
    return React.cloneElement(children, { loaded, records, status, total })
  }

  componentDidMount() {
    const { endpoint, sort } = this.props
    this.props.onFetch(endpoint, { '$skip': 0, $sort: sort })
  }

  componentDidUpdate(prevProps) {
    const { endpoint, loaded, records, sort, status } = this.props
    if(prevProps.sort != sort) {
      this.props.onReset()
    } else if(prevProps.status != status) {
      if(status === 'loaded' && records.length > 0) {
        this._attachScrollListener()
      } else if(status === 'pending') {
        this.props.onFetch(endpoint, { '$skip': loaded, $sort: sort })
      }
    }
  }

  componentWillUnmount() {
    if(this._container()) {
      this._detachScrollListener()
    }
  }

  _container() {
    if(!this.container) {
      this.container = ReactDOM.findDOMNode(this).firstChild
    }
    return this.container
  }

  _attachScrollListener() {
    const { status } = this.props
    if(status == 'loading') return
    const el = this._container()
    el.addEventListener('scroll', this._scrollListener.bind(this), true)
    el.addEventListener('resize', this._scrollListener.bind(this), true)
    this._scrollListener()
  }

  _detachScrollListener() {
    const el = this._container()
    el.removeEventListener('scroll', this._scrollListener.bind(this), true)
    el.removeEventListener('resize', this._scrollListener.bind(this), true)
  }

  _scrollListener() {
    const { endpoint, sort, loaded, status, total } = this.props
    if(status == 'loading') return
    const el = this._container()
    const bottomScrollPos = el.scrollTop + el.offsetHeight
    const bottomPosition = (el.scrollHeight - bottomScrollPos)
    if (status === 'pending' || (bottomPosition < 100 && loaded < total)) {
      this._detachScrollListener()
      this.props.onFetch(endpoint, { '$skip': loaded, $sort: sort })
    }
  }

}

const mapStateToProps = state => ({
  loaded: state.infinite.loaded,
  records: state.infinite.records,
  status: state.infinite.status,
  total: state.infinite.total
})

const mapDispatchToProps = {
  onFetch: actions.fetch,
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Infinite)
