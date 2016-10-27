import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Drawer from './drawer'
import Topbar from './topbar'
import Notifications from './notifications'

export class Chrome extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object
  }

  static propTypes: {
    expanded: React.PropTypes.bool.isRequired
  }

  render() {
    const { expanded } = this.props
    return (
      <div className="chrome">
        <Transition transitionName="expanded" transitionAppear={true} transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          { expanded && <Drawer key="chrome-drawer" /> }
          { expanded && <div key="chrome-expanded" className="chrome-overlay" onClick={this._handleToggleDrawer.bind(this)} /> }
        </Transition>
        <div className="chrome-canvas">
          <Topbar />
          <div className="chrome-header">
            <div className="ui breadcrumb">
              <a className="section">Dashboard</a>
              <div className="divider"> / </div>
              <div className="active section">Contacts</div>
            </div>
          </div>
          <div className="chrome-body">
            {this.props.children}
          </div>
          <Notifications />
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { apps, active } = this.props
    const app = apps[active]
    if(prevProps.active != active) {
      this.context.history.push(app.route)
      document.title = 'Platform | ' + app.name
    }
  }

  _handleToggleDrawer() {
    this.props.onToggleDrawer()
  }

}

const mapStateToProps = (state) => ({
  expanded: state.chrome.expanded,
  apps: state.chrome.apps,
  active: state.chrome.active
})

const mapDispatchToProps = {
  onToggleDrawer: actions.toggleDrawer
}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
