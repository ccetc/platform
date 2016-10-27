import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Drawer extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object
  }

  static propTypes: {
    active: React.PropTypes.string.isRequired,
    apps: React.PropTypes.array.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object.isRequired,
    onChangeApp: React.PropTypes.func.isRequired,
    onToggleDrawer: React.PropTypes.func.isRequired
  }

  render() {
    const { active, apps, expanded, user } = this.props
    return (
      <Transition transitionName="expanded" transitionAppear={true} transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppearTimeout={250}>
        { expanded && <div key="chrome-drawer-overlay" className="chrome-drawer-overlay" onClick={this._handleToggleDrawer.bind(this)} /> }
        { expanded &&
          <div key="chrome-drawer" className="chrome-drawer">
            <div className="chrome-presence">
              <img src={user.photo} className="ui image circular" />
              <div className="chrome-user">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="chrome-apps">
              {apps.map((app, index) => {
                let classes = (index === active) ? 'chrome-app active' : 'chrome-app'
                return (
                  <div key={`app_${index}`} className={classes} onClick={this._handleChangeApp.bind(this, index)}>
                    <i className={`${app.icon} icon`} />
                    {app.name}
                  </div>
                )
              })}
            </div>
          </div>
        }
      </Transition>
    )
  }

  componentDidUpdate(prevProps) {
    const { active, apps } = this.props
    const app = apps[active]
    if(prevProps.active != active) {
      this.context.history.push(app.route)
    }
  }

  _handleToggleDrawer() {
    this.props.onToggleDrawer()
  }

  _handleChangeApp(index) {
    this.props.onChangeApp(index)
  }

}

const mapStateToProps = (state) => ({
  active: state.chrome.active,
  apps: state.chrome.apps,
  expanded: state.chrome.expanded,
  user: state.chrome.user
})

const mapDispatchToProps = {
  onChangeApp: actions.changeApp,
  onToggleDrawer: actions.toggleDrawer
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
