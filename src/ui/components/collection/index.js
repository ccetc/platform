import React from 'react'
import { connect } from 'react-redux'
import multicomponent from 'ui/multicomponent'
import Infinite from '../infinite'
import Table from './table'

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

const mapStateToProps = (state, props) => ({
  params: state.collection[props.cid].params
})

Container = connect(mapStateToProps)(Container)

export default multicomponent(Container, 'collection')
