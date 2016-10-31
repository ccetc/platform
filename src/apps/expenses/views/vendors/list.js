import React from 'react'
import Helmet from 'react-helmet'

class List extends React.Component {

  render() {
    return (
      <div className="chrome-content">
        <Helmet {...this._getHead()} />
        <p>Vendors List</p>
      </div>
    )
  }

  _getHead() {
    return {
      title: 'Platform | Vendors'
    }
  }

}

export default List
