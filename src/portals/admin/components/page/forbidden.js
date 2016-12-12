import React from 'react'
import Helmet from 'react-helmet'

export class Forbidden extends React.Component {

  static contextTypes = {
    team: React.PropTypes.object
  }

  render() {
    return (
      <div className="chrome-page">
        <Helmet title={`${this.context.team.title} | 403 Forbidden`} />
        <div className="chrome-header">
          <div className="chrome-back"></div>
          <div className="chrome-title">Access Denied!</div>
          <div className="chrome-more"></div>
        </div>
        <div className="chrome-error">
          <div className="chrome-error-message">
            <i className="warning sign icon" />
            <h2>You do not have permission to access this content</h2>
          </div>
        </div>
      </div>
    )
  }

}

export default Forbidden
