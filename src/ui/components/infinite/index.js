import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

class Infinite extends React.Component {

  static propTypes: {
    endpoint: React.PropTypes.string.isRequired,
    loaded: React.PropTypes.number.isRequired,
    records: React.PropTypes.array.isRequired,
    status: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { children, loaded, records, status, total } = this.props
    return (
      <div>
        { React.cloneElement(children, { loaded, records, status, total }) }
        { status === 'loading' ? 'Loading...' : null }
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
    return ReactDOM.findDOMNode(this).parentNode
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
    const { endpoint, loaded, status, total } = this.props
    if(status == 'loading') return
    const el = this._container()
    const bottomScrollPos = el.scrollTop + el.offsetHeight
    const bottomPosition = (el.scrollHeight - bottomScrollPos)
    if (status === 'pending' || (bottomPosition < 100 && loaded < total)) {
      this._detachScrollListener()
      this.props.onFetch(endpoint, { '$skip': loaded })
    }
  }

}

const mapStateToProps = (state) => ({
  loaded: state.infinite.loaded,
  records: state.infinite.records,
  status: state.infinite.status,
  total: state.infinite.total
})

const mapDispatchToProps = {
  onFetch: actions.fetch
}

export default connect(mapStateToProps, mapDispatchToProps)(Infinite)
