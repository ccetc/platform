import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import Modal from '../modal'
import Drawer from './drawer'
import Topbar from './topbar'
import Tasks from '../tasks'
import Notifications from '../notifications'

export class Chrome extends React.Component {

  static childContextTypes = {
    chrome: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    token: React.PropTypes.string,
    user:React.PropTypes.object
  }

  render() {
    const { children, user } = this.props
    if(!user) {
      return null
    }
    return (
      <div className="chrome">
        <Modal>
          <Tasks>
            <Topbar />
            <Drawer />
            { children }
          </Tasks>
        </Modal>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { route } = this.props
    if(prevProps.route != route) {
      this.context.router.push(route)
    }
  }

  getChildContext() {
    const { params, transitionTo, openDrawer, closeDrawer } = this.props
    return {
      chrome: {
        params,
        transitionTo,
        openDrawer,
        closeDrawer
      }
    }
  }

}

const mapStateToProps = (state) => ({
  route: state.chrome.route,
  user: state.session.user
})

const mapDispatchToProps = {
  transitionTo: actions.transitionTo,
  openDrawer: actions.openDrawer,
  closeDrawer: actions.closeDrawer,
  setFlash: actions.setFlash,
  clearFlash: actions.clearFlash
}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
