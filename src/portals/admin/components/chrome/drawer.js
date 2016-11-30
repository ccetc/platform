import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as sessionActions from '../session/actions'

export class Drawer extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object
  }

  static propTypes: {
    app: React.PropTypes.integer.isRequired,
    apps: React.PropTypes.array.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    item: React.PropTypes.integer.isRequired,
    user: React.PropTypes.object.isRequired,
    onChooseApp: React.PropTypes.func.isRequired,
    onSignout: React.PropTypes.func.isRequired
  }

  render() {
    const { apps, expanded } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        { expanded && <div key="chrome-drawer-overlay" className="chrome-drawer-overlay" onClick={this._handleToggleDrawer.bind(this)} /> }
        { expanded &&
          <div className="chrome-drawer">
            <div className="chrome-drawer-instance">
              <h3>Cornell Cooperative Extension of Tompkins County</h3>
            </div>
            <div className="chrome-apps">
              {apps.map((app, appindex) => {
                return (
                  <div key={`app_${appindex}`} className="chrome-app">
                    <div className="chrome-app-title" onClick={this._handleChooseApp.bind(this, appindex)}>
                      <i className={`${app.icon} icon`} />
                      {app.name}
                    </div>
                    <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
                      {appindex === this.props.app &&
                        <div className="chrome-app-menu">
                          {app.items.map((item, itemindex) => {
                            return <div key={`appitem_${itemindex}`} className="chrome-app-item" onClick={this._handleTransitionTo.bind(this, item.route)}>{item.name}</div>
                          })}
                        </div>
                      }
                    </Transition>
                  </div>
                )
              })}
            </div>
          </div>
        }
      </Transition>
    )
  }

  _handleToggleDrawer() {
    this.props.onToggleDrawer()
  }

  _handleChooseApp(index) {
    this.props.onChooseApp(index)
  }

  _handleTransitionTo(pathname) {
    this.context.chrome.transitionTo({ pathname, state: 'static' })
  }

}

const mapStateToProps = (state) => ({
  app: state.chrome.drawer.app,
  apps: state.session.apps,
  expanded: state.chrome.drawer.expanded,
  route: state.chrome.drawer.route
})

const mapDispatchToProps = {
  onToggleDrawer: actions.toggleDrawer,
  onChooseApp: actions.chooseApp,
  onSignout: sessionActions.signout
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
