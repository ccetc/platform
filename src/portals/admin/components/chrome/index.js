import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import Drawer from './drawer'
import Topbar from './topbar'
import Account from '../account'
import Search from './search'
import Notifications from '../notifications'

export class Chrome extends React.Component {

  static childContextTypes = {
    chrome: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes: {
    token: React.PropTypes.string.isRequired,
    set: React.PropTypes.func.isRequired
  }

  render() {
    const { children } = this.props
    return (
      <div className="chrome">
        <Drawer />
        <Topbar />
        <Search />
        <Account />
        { children }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { route } = this.props
    if(prevProps.route != route) {
      this.context.router.push(route)
    }
  }

  _handleSetFlash(style, message) {
    this.props.setFlash(style, message)
  }

  _handleClearFlash() {
    this.props.clearFlash()
  }

  _handleTransitionTo(route) {
    this.props.onTransitionTo(route)
  }

  getChildContext() {
    return {
      chrome: {
        transitionTo: this._handleTransitionTo.bind(this)
      }
    }
  }

}

const mapStateToProps = (state) => ({
  route: state.chrome.route
})

const mapDispatchToProps = {
  onTransitionTo: actions.transitionTo,
  setFlash: actions.setFlash,
  clearFlash: actions.clearFlash
}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
