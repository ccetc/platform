import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

export default (mapEndpointsToProps) => {

  return function wrapWithConnect(WrappedComponent) {

    const cid = _.random(100000, 999999)

    class Container extends React.Component {

      static childContextTypes = {
        container: React.PropTypes.object
      }

      render() {
        const { status, data } = this.props
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

      getChildContext() {
        return {
          container: {
            refresh: this._fetchResources.bind(this)
          }
        }
      }

      _fetchResources() {
        const resources = mapEndpointsToProps(this.props)
        const keys = Object.keys(resources)
        _.forOwn(resources, (endpoint, prop) => {
          this.props.onFetchResource(cid, keys, prop, endpoint)
        })
      }

    }

    const mapStateToProps = (state, props) => {
      return (state.container && state.container[cid]) ? state.container[cid] : {}
    }

    const mapDispatchToProps = {
      onFetchResource: actions.fetchResource
    }

    return connect(mapStateToProps, mapDispatchToProps)(Container)

  }

}
