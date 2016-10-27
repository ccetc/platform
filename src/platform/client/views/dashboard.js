import React from 'react'
import Helmet from 'react-helmet'

class Dashboard extends React.Component {

  render() {
    return (
      <div className="chrome-content">
        <Helmet {...this._getHead()} />
        <p>This is the Dashboard</p>
      </div>
    )
  }

  _getHead() {
    return {
      title: 'Platform | Dashboard'
    }
  }

}

export default Dashboard
