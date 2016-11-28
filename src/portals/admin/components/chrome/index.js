import React from 'react'
import { connect } from 'react-redux'
import * as flashActions from '../flash/actions'
import Flash from '../flash'
import Drawer from '../drawer'
import Topbar from './topbar'
import Notifications from '../notifications'

export class Chrome extends React.Component {

  static childContextTypes = {
    flash: React.PropTypes.object
  }

  static propTypes: {
    token: React.PropTypes.string.isRequired,
    set: React.PropTypes.func.isRequired
  }

  render() {
    const { children } = this.props
    return (
      <div className="chrome">
        <Flash />
        <Drawer />
        <Topbar />
        { children }
      </div>
    )
  }

  _handleSetFlash(style, message) {
    this.props.set(style, message)
  }

  _handleClearFlash() {
    this.props.clear()
  }

  getChildContext() {
    return {
      flash: {
        set: this._handleSetFlash.bind(this),
        clear: this._handleClearFlash.bind(this)
      }
    }
  }

}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  set: flashActions.set,
  clear: flashActions.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
