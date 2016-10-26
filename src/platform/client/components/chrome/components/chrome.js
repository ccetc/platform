import React from 'react'
import { connect } from 'react-redux'
import Drawer from './drawer'
import Topbar from './topbar'

export class Chrome extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object
  }

  static propTypes: {
    expanded: React.PropTypes.bool.isRequired
  }

  render() {
    const classes = (this.props.expanded) ? 'chrome expanded' : 'chrome'
    return (
      <div className={classes}>
        <Drawer />
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
