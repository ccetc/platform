import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

export class History extends React.Component {

  static childContextTypes = {
    history: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    history: React.PropTypes.array,
    goBack: React.PropTypes.func,
    push: React.PropTypes.func
  }

  render() {
    return this.props.children
  }

  componentDidMount() {
    this.props.onPush(this.props.location.pathname)
  }

  componentDidUpdate(prevProps) {
    const { location, history, onPush } = this.props
    if(location.pathname != history[history.length - 1] && location.state !== 'back') {
      onPush(location.pathname)
    }
  }

  getChildContext() {
    return {
      history: {
        goBack: this._goBack.bind(this),
        push: this._push.bind(this)
      }
    }
  }

  _goBack() {
    const { history, onGoBack } = this.props
    const pathname = history[history.length - 2]
    onGoBack()
    this.context.router.push({ pathname, state: 'back' })
  }

  _push(descriptor) {
    const { onPush } = this.props
    const pathname = descriptor.pathname || descriptor
    onPush(pathname)
    this.context.router.push(descriptor)
  }

}

const mapStateToProps = state => ({
  history: state.history
})

const mapDispatchToProps = {
  onPush: actions.push,
  onGoBack: actions.goBack
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
