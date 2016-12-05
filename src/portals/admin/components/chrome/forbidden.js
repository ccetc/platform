import React from 'react'
import Helmet from 'react-helmet'

export class Forbidden extends React.Component {

  render() {
    return (
      <div className="chrome-page">
        <Helmet title="Platform | 403 Forbidden" />
        <div className="chrome-header">
          <div className="chrome-back"></div>
          <div className="chrome-title">Access Denied!</div>
          <div className="chrome-more"></div>
        </div>
        <div className="chrome-body">
          <div className="chrome-forbidden">
            <i className="warning sign icon" />
            <p>You do not have permission to access this content</p>
          </div>
        </div>
      </div>
    )
  }

}

export default Forbidden
