import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Navigation extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object,
    drawer: React.PropTypes.object
  }

  static propTypes = {
    app: React.PropTypes.number,
    apps: React.PropTypes.array.isRequired,
    onChooseApp: React.PropTypes.func.isRequired
  }

  render() {
    const { apps } = this.props
    return (
      <div className="chrome-navigation-panel">
        <div className="chrome-navigation-title">
          <h3>Apps</h3>
        </div>
        <div className="chrome-apps">
          {apps.map((app, appindex) => {
            return (
              <div key={`app_${appindex}`} className="chrome-app">
                <div className={`chrome-app-title ${this.props.app === appindex ? 'active' : ''}`} onClick={this._handleChooseApp.bind(this, appindex)}>
                  <i className={`${app.icon} icon`} />
                  {app.name}
                </div>
                <CSSTransitionGroup transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
                  {appindex === this.props.app &&
                    <div className="chrome-app-menu">
                      {app.items.map((item, itemindex) => {
                        return <div key={`appitem_${itemindex}`} className="chrome-app-item" onClick={this._handleTransitionTo.bind(this, item.route)}>{item.name}</div>
                      })}
                    </div>
                  }
                </CSSTransitionGroup>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  _handleChooseApp(index) {
    this.props.onChooseApp(index)
  }

  _handleTransitionTo(pathname) {
    this.props.onChooseApp(null)
    this.context.drawer.close()
    this.context.chrome.transitionTo({ pathname, state: 'static' })
  }

}

const mapStateToProps = (state) => ({
  app: state.chrome.navigation.app,
  apps: state.session.apps,
  route: state.chrome.navigation.route
})

const mapDispatchToProps = {
  onChooseApp: actions.chooseApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
