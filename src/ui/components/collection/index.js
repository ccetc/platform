import React from 'react'
import { connect } from 'react-redux'
import Infinite from '../infinite'
import Table from './table'
import * as actions from './actions'

class Collection extends React.Component {

  render() {
    return (
      <div className="collection">
        <Table {...this.props} />
      </div>
    )
  }

}

class Container extends React.Component {

  render() {
    return (
      <Infinite {...this._getInfinite()}>
        <Collection {...this.props} />
      </Infinite>
    )
  }

  _getInfinite() {
    const { endpoint, params } = this.props
    return {
      endpoint,
      sort: (params.sort.order === 'desc' ? '-' : '') + params.sort.key
    }
  }

}

const mapStateToProps = state => ({
  params: state.collection.params
})

const mapDispatchToProps = {
  onSort: actions.sort
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
