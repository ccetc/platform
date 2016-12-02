import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import Modal from './modal'
import Drawer from './drawer'
import Topbar from './topbar'
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
        <Topbar />
        <Modal />
        <Drawer />
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

  getChildContext() {
    const { params, transitionTo, openModal, closeModal, openDrawer, closeDrawer } = this.props
    return {
      chrome: {
        params,
        transitionTo,
        openModal,
        closeModal,
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
  openModal: actions.openModal,
  closeModal: actions.closeModal,
  openDrawer: actions.openDrawer,
  closeDrawer: actions.closeDrawer,
  setFlash: actions.setFlash,
  clearFlash: actions.clearFlash
}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
