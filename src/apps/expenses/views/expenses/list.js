import React from 'react'
import Helmet from 'react-helmet'

class List extends React.Component {

  render() {
    return (
      <div className="chrome-content">
        <Helmet {...this._getHead()} />
        <p>Expenses List</p>
      </div>
    )
  }

  _getHead() {
    return {
      title: 'Platform | Expenses'
    }
  }

}

export default List
