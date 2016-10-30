import React from 'react'
import Helmet from 'react-helmet'

class Show extends React.Component {

  render() {
    return (
      <div className="chrome-content">
        <Helmet {...this._getHead()} />
        <p>Ken Schlather</p>
      </div>
    )
  }

  _getHead() {
    return {
      title: 'Platform | Ken Schlather'
    }
  }

}

export default Show
