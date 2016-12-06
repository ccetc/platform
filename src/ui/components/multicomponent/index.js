import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from './actions'

export default (WrappedComponent, namespace) => {

  class MutliComponent extends React.Component {

    constructor(props) {
      super(props)
      this.cid = _.random(100000, 999999).toString(36)
    }

    render() {
      if(this.props.state[namespace][this.cid]) {
        return <WrappedComponent cid={this.cid} {..._.omit(this.props, ['state'])} />
      } else  {
        return null
      }
    }

    componentDidMount() {
      this.props.onAddComponent(namespace, this.cid)
    }

    componentWillUnmount() {
      this.props.onRemoveComponent(namespace, this.cid)
    }

  }

  const mapStateToProps = state => ({
    state
  })

  const mapDispatchToProps = {
    onAddComponent: actions.addComponent,
    onRemoveComponent: actions.removeComponent
  }

  return connect(mapStateToProps, mapDispatchToProps)(MutliComponent)

}
