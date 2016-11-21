import React from 'react'
import Infinite from '../infinite'
import Table from './table'

class Collection extends React.Component {

  render() {
    return (
      <Infinite {...this._getInfinite()}>
        <Table />
      </Infinite>
    )
  }

  _getInfinite() {
    return {
      endpoint: this.props.endpoint
    }
  }

}

export default Collection
