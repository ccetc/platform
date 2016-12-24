import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { getActiveTeam } from '../../containers/admin/selectors'
import Search from '../search'

export class NotFound extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  static propTypes = {
    team: React.PropTypes.object
  }

  render() {
    const { team } = this.props
    return (
      <div className="chrome-page">
        <Helmet title={`${team.title} | 404 Not Found`} />
        <div className="chrome-header">
          <div className="chrome-back"></div>
          <div className="chrome-title">Not Found</div>
          <div className="chrome-more"></div>
        </div>
        <div className="chrome-error">
          <div className="chrome-error-message">
            <i className="warning sign icon" />
            <h2>Unable to locate the requested resource</h2>
            <div className="ui basic red button" onClick={this._handleSearch.bind(this)}>Search for resource</div>
          </div>
        </div>
      </div>
    )
  }

  _handleSearch() {
    this.context.modal.open(Search)
  }

}

const mapStateToProps = state => ({
  team: getActiveTeam(state)
})

export default connect(mapStateToProps)(NotFound)
