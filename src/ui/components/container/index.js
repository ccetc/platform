import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

export default (mapEndpointsToProps) => {

  return function wrapWithConnect(WrappedComponent) {

    class Container extends React.Component {

      render() {
        const { status, data } = this.props.state
        if(status === 'error') {
          return <div>Unable to load resources</div>
        } else if(status === 'loaded') {
          return <WrappedComponent {...this.props} {...data} />
        } else  {
          return <div />
        }
      }

      componentDidMount() {
        this._fetchResources()
      }

      componentDidUpdate(prevProps) {
        if(prevProps.location.pathname != this.props.location.pathname) {
          this._fetchResources()
        }
      }

      _fetchResources() {
        const resources = mapEndpointsToProps(this.props)
        _.forOwn(resources, (endpoint, prop) => {
          this.props.onFetchResource(prop, endpoint)
        })
      }

    }

    const mapStateToProps = state => ({
      state: state.container
    })

    const mapDispatchToProps = {
      onFetchResource: actions.fetchResource
    }

    return connect(mapStateToProps, mapDispatchToProps)(Container)

  }

}
