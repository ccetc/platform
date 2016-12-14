import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as actions from './actions'

export default (mapComponentStateToProps, mapComponentDispatchToProps, PlainComponent, namespace, singleton) => {

  const wrappedMapComponentDispatchToProps = (dispatch, props) => {
    const actions = Object.keys(mapComponentDispatchToProps).reduce((actions, key) => {
      return {
        ...actions,
        [key]: function() {
          var oldArguments = Array.prototype.slice.call(arguments)
          var action = {
            ...mapComponentDispatchToProps[key](...oldArguments),
            tid: props.tid,
            cid: props.cid
          }
          dispatch(action)
        }
      }
    }, {})
    return actions
  }

  const WrappedComponent = connect(mapComponentStateToProps, wrappedMapComponentDispatchToProps)(PlainComponent)

  class Component extends React.Component {

    static propTypes = {
      components: React.PropTypes.array,
      onAdd: React.PropTypes.func,
      onemove: React.PropTypes.func
    }


    constructor(props) {
      super(props)
      this.tid = (props.active !== null) ? props.teams[props.active].id : null
      this.cid = (!singleton) ? _.random(100000, 999999).toString(36) : null
      this.index = (singleton) ? this.tid : `${this.tid}-${this.cid}`
      this.identifier = `${namespace}-${this.index}`
    }

    render() {
      const { children, components } = this.props
      if(components && _.includes(components, this.identifier)) {
        const childProps = _.omit(this.props, ['components'])
        if(singleton) {
          return <WrappedComponent {...childProps} tid={this.tid} identifier={this.index}>{ children }</WrappedComponent>
        } else {
          return <WrappedComponent {...childProps} tid={this.tid} identifier={this.index}>{ children }</WrappedComponent>
        }
      }
      return null
    }

    componentDidMount() {
      this.props.onAdd(namespace, this.tid, this.cid)
    }

    componentWillUnmount() {
      this.props.onRemove(namespace, this.tid, this.cid)
    }

  }

  const mapStateToProps = state => ({
    active: state.admin.active ,
    components: state.components,
    teams: state.admin.teams
  })

  const mapDispatchToProps = {
    onAdd: actions.add,
    onRemove: actions.remove
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)

}
