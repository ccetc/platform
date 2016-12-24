import React from 'react'

export class History extends React.Component {

  static childContextTypes = {
    history: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.history = []
  }

  render() {
    return this.props.children
  }

  componentDidMount() {
    this.history.push(this.props.location.pathname)
  }

  componentDidUpdate(prevProps) {
    if(this.props.location.pathname != this.history[this.history.length - 1] && this.props.location.state !== 'back') {
      this.history.push(this.props.location.pathname)
    }
  }

  getChildContext() {
    return {
      history: {
        goBack: this._goBack.bind(this),
        get: this._get.bind(this),
        transitionTo: this._transitionTo.bind(this)
      }
    }
  }

  _get() {
    return this.history
  }

  _goBack() {
    this.history.pop()
    const pathname = this.history[this.history.length - 1]
    this.context.router.push({ pathname, state: 'back' })
  }

  _transitionTo(descriptor) {
    const pathname = descriptor.pathname || descriptor
    this.history.push(pathname)
    this.context.router.push(descriptor)
  }

}

export default History
