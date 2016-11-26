import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as sessionActions from '../session/actions'

export class Drawer extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes: {
    app: React.PropTypes.integer.isRequired,
    apps: React.PropTypes.array.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    item: React.PropTypes.integer.isRequired,
    user: React.PropTypes.object.isRequired,
    onChooseApp: React.PropTypes.func.isRequired,
    onChooseItem: React.PropTypes.func.isRequired,
    onSignout: React.PropTypes.func.isRequired
  }

  render() {
    const { apps, expanded, user } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        { expanded && <div key="chrome-drawer-overlay" className="chrome-drawer-overlay" onClick={this._handleToggle.bind(this)} /> }
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
                            return <div key={`appitem_${itemindex}`} className="chrome-app-item" onClick={this._handleChooseItem.bind(this, itemindex)}>{item.name}</div>
                          })}
                        </div>
                      }
                    </Transition>
                  </div>
                )
              })}
              <div className="chrome-app">
                <div className="chrome-app-title" onClick={this._handleSignout.bind(this)}>
                  <i className="power icon" />
                  Sign Out
                </div>
              </div>
            </div>
          </div>
        }
      </Transition>
    )
  }

  componentDidUpdate(prevProps) {
    const { apps, app, item } = this.props
    if(prevProps.item != item) {
      this.context.router.push({ pathname: apps[app].items[item].route, state: 'static' })
    }
  }

  _handleToggle() {
    this.props.onToggle()
  }

  _handleChooseApp(index) {
    this.props.onChooseApp(index)
  }

  _handleChooseItem(index) {
    this.props.onChooseItem(index)
  }

  _handleSignout() {
    this.props.onSignout()
  }

}

const mapStateToProps = (state) => ({
  app: state.drawer.app,
  apps: state.session.apps,
  expanded: state.drawer.expanded,
  item: state.drawer.item,
  user: state.session.user
})

const mapDispatchToProps = {
  onToggle: actions.toggle,
  onChooseApp: actions.chooseApp,
  onChooseItem: actions.chooseItem,
  onSignout: sessionActions.signout
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
