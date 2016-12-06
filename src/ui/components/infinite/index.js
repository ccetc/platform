import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import multicomponent from 'ui/components/multicomponent'
import * as actions from './actions'

class Infinite extends React.Component {

  static propTypes = {
    cid: React.PropTypes.string,
    endpoint: React.PropTypes.string,
    loaded: React.PropTypes.number,
    records: React.PropTypes.array,
    status: React.PropTypes.string,
    sort: React.PropTypes.string,
    total: React.PropTypes.number
  }

  render() {
    const { children, loaded, records, status, total } = this.props
    return React.cloneElement(children, { loaded, records, status, total })
  }

  componentDidMount() {
    const { endpoint, sort } = this.props
    this.props.onFetch(this.props.cid, endpoint, { '$skip': 0, $sort: sort })
  }

  componentDidUpdate(prevProps) {
    const { endpoint, sort, loaded, records, status } = this.props
    if(prevProps.sort != sort) {
      this.props.onReset(this.props.cid)
    } else if(prevProps.status != status) {
      if(status === 'loaded' && records.length > 0) {
        this._attachScrollListener()
      } else if(status === 'pending') {
        this.props.onFetch(this.props.cid, endpoint, { '$skip': loaded, $sort: sort })
      } else if(status === 'completed') {
        this._detachScrollListener()
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
      const el = ReactDOM.findDOMNode(this)
      this.container = (el) ? el.firstChild : null
    }
    return this.container
  }

  _listener() {
    if(!this.listener) {
      this.listener = _.throttle(this._scrollListener.bind(this), 100)
    }
    return this.listener
  }

  _attachScrollListener() {
    console.log('attached')
    const { status } = this.props
    const el = this._container()
    if(!el || status == 'loading') return
    el.addEventListener('scroll', this._listener(), true)
    el.addEventListener('resize', this._listener(), true)
    this._scrollListener()
  }

  _detachScrollListener() {
    const el = this._container()
    if(!el) return
    el.removeEventListener('scroll', this._listener(), true)
    el.removeEventListener('resize', this._listener(), true)
  }

  _scrollListener() {
    const { endpoint, sort, loaded, status, total } = this.props
    const el = this._container()
    if(!el || status == 'loading') return
    const bottomScrollPos = el.scrollTop + el.offsetHeight
    const bottomPosition = (el.scrollHeight - bottomScrollPos)
    if (status === 'pending' || (bottomPosition < 250 && loaded < total)) {
      this.props.onFetch(this.props.cid, endpoint, { '$skip': loaded, $sort: sort })
    }
  }

}

const mapStateToProps = (state, props) => ({
  loaded: state.infinite[props.cid].loaded,
  records: state.infinite[props.cid].records,
  status: state.infinite[props.cid].status,
  total: state.infinite[props.cid].total
})

const mapDispatchToProps = {
  onFetch: actions.fetch,
  onReset: actions.reset
}

Infinite = connect(mapStateToProps, mapDispatchToProps)(Infinite)

export default multicomponent(Infinite, 'infinite')
