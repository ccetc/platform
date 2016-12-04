import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from './actions'

class Container extends React.Component {

  static childContextTypes = {
    container: React.PropTypes.object
  }

  static propTypes = {
    onFetchResource: React.PropTypes.func
  }

  render() {
    const { children } = this.props
    return (
      <div className="chrome-container">
        { children }
      </div>
    )
  }

  getChildContext() {
    return {
      container: {
        fetch: this._fetchResources.bind(this),
        refresh: this._refreshResource.bind(this)
      }
    }
  }

  _fetchResources(resources) {
    _.forOwn(resources, (endpoint, prop) => {
      this.props.onFetchResource(prop, endpoint)
    })
  }

  _refreshResource(prop) {
    const endpoint = this.props.routes[prop]
    if(endpoint) {
      this.props.onFetchResource(prop, endpoint)
    }
  }

}

const mapStateToProps = (state) => ({
  routes: state.container.routes
})

const mapDispatchToProps = {
  onFetchResource: actions.fetchResource
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
