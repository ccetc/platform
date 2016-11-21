import React from 'react'
import Infinite from '../infinite'
import Toolbar from './toolbar'
import Table from './table'

class Container  extends React.Component {

  render() {
    return (
      <Infinite {...this._getInfinite()}>
        <Collection {...this.props} />
      </Infinite>
    )
  }

  _getInfinite() {
    return {
      endpoint: this.props.endpoint
    }
  }

}

class Collection extends React.Component {

  render() {
    return (
      <div className="collection">
        <Toolbar {...this.props} />
        <Table {...this.props} />
      </div>
    )
  }

}

export default Container
