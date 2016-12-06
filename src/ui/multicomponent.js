import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { addComponent, removeComponent } from './reducer'

export default (WrappedComponent, namespace, singleton) => {

  class MutliComponent extends React.Component {

    constructor(props) {
      super(props)
      this.cid = (!singleton) ? _.random(100000, 999999).toString(36) : null
    }

    render() {
      if(singleton && this.props.state[namespace]) {
        return <WrappedComponent {..._.omit(this.props, ['state'])} />
      } else if(!singleton && this.props.state[namespace][this.cid]) {
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
    onAddComponent: addComponent,
    onRemoveComponent: removeComponent
  }

  return connect(mapStateToProps, mapDispatchToProps)(MutliComponent)

}
