import React from 'react'
import component from 'portals/admin/components/component'
import Infinite from 'portals/admin/containers/infinite'
import Header from './header'
import Table from './table'

class Collection extends React.Component {

  render() {
    return (
      <div className="collection">
        <Header {...this.props} />
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
  ...state.collection[props.cid]
})

export default component(mapStateToProps, {}, Container, 'collection', true)
