import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../session/actions'
import Flash from './flash'
import Drawer from './drawer'
import Topbar from './topbar'
import Notifications from './notifications'

export class Chrome extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes: {
    flash: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    onSetFlash: React.PropTypes.func.isRequired
  }

  render() {
    const { flash } = this.props
    return (
      <div className="chrome">
        <Flash />
        <Drawer />
        <div className="chrome-canvas">
          <Topbar />
          {this.props.children}
          <Notifications />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleRedirect()
  }

  componentDidUpdate() {
    this._handleRedirect()
  }

  _handleRedirect() {
    if(!this.props.user) {
      this.props.onSetFlash('error', 'You must first login')
      this.context.router.push('/admin/signin')
    }
  }

}

const mapStateToProps = (state) => ({
  flash: state.session.flash,
  user: state.session.user
})

const mapDispatchToProps = {
  onSetFlash: actions.setFlash
}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
