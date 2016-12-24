import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { getActiveTeam } from '../admin/selectors'

export class Forbidden extends React.Component {

  render() {
    const { team } = this.props
    return (
      <div className="chrome-page">
        <Helmet title={`${team.title} | 403 Forbidden`} />
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

const mapStateToProps = state => ({
  team: getActiveTeam(state)
})

export default connect(mapStateToProps)(Forbidden)
