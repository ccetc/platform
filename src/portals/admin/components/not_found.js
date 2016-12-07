import React from 'react'
import Helmet from 'react-helmet'
import Search from './search'

export class Forbidden extends React.Component {

  static contextTypes = {
    instance: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    return (
      <div className="chrome-page">
        <Helmet title={`${this.context.instance.title} | 404 Not Found`} />
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

export default Forbidden
