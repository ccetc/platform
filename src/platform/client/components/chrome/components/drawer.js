import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Drawer extends React.Component {

  static propTypes: {
    active: React.PropTypes.string.isRequired,
    apps: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    onChangeApp: React.PropTypes.func.isRequired
  }

  render() {
    const { user, apps, active } = this.props
    return (
      <div className="chrome-drawer">
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
    )
  }

  _handleChangeApp(index) {
    this.props.onChangeApp(index)
  }

}

const mapStateToProps = (state) => ({
  active: state.chrome.active,
  apps: state.chrome.apps,
  user: state.chrome.user
})

const mapDispatchToProps = {
  onChangeApp: actions.changeApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
