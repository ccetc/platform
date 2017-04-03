import React from 'react'
import Page from 'admin/components/page'
import Search from '../search'

export class NotFound extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return (
      <div className="chrome-error">
        <div className="chrome-error-message">
          <i className="warning sign icon" />
          <h2>Unable to locate the requested resource</h2>
          <div className="ui basic red button" onClick={this._handleSearch.bind(this)}>Search for resource</div>
        </div>
      </div>
    )
  }

  _handleSearch() {
    this.context.modal.push(Search)
  }

}

const mapResourcesToPage = (props, context) => ({})

const mapPropsToPage = (props, context, resources) => ({
  title: '404 Not Found'
})

export default Page(mapResourcesToPage, mapPropsToPage)(NotFound)
