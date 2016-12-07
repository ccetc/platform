import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { addComponent, removeComponent } from './reducer'

export default (WrappedComponent, namespace, singleton) => {

  class Component extends React.Component {

    constructor(props) {
      super(props)
      this.cid = (!singleton) ? _.random(100000, 999999).toString(36) : null
      this.identifier = (singleton) ? namespace : `${namespace}-${this.cid}`
    }

    render() {
      const { children, components } = this.props
      if(components && _.includes(components, this.identifier)) {
        const childProps = _.omit(this.props, ['components'])
        if(singleton) {
          return <WrappedComponent {...childProps}>{ children }</WrappedComponent>
        } else {
          return <WrappedComponent {...childProps} cid={this.cid}>{ children }</WrappedComponent>
        }
      }
      return null
    }

    componentDidMount() {
      this.props.onAddComponent(namespace, this.cid)
    }

    componentWillUnmount() {
      this.props.onRemoveComponent(namespace, this.cid)
    }

  }

  const mapStateToProps = state => ({
    components: state.components
  })

  const mapDispatchToProps = {
    onAddComponent: addComponent,
    onRemoveComponent: removeComponent
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)

}
