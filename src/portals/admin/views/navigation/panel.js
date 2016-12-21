import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import { getActiveTeam, getActiveUser } from '../../containers/admin/selectors'
import { userHasRights } from './utils'

class Panel extends React.Component {

  static contextTypes = {
    admin: React.PropTypes.object,
    drawer: React.PropTypes.object,
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  render() {
    const { items, mode, teams, team, user } = this.props
    return (
      <div className="chrome-navigation-panel">
        { mode === 'apps'  &&
          <div className="chrome-navigation-header">
            <div className="chrome-navigation-header-back">
              <img src={ team.logo } />
            </div>
            <div className="chrome-navigation-header-title">
              { team.title }
            </div>
            <div className="chrome-navigation-header-next" onClick={ this._handleToggleMode.bind(this) }>
              { mode === 'apps' && <i className="chevron down icon" /> }
              { mode === 'teams' && <i className="chevron up icon" /> }
            </div>
          </div>
        }
        { mode === 'apps' &&
          <div className="chrome-navigation-body">
            { items.map((item, index) => {
              if(!item.rights || userHasRights(user, item.rights)) {
                return (
                  <div key={`item_${index}`} className="chrome-navigation-item" onClick={ this._handleBrowse.bind(this, item)}>
                    { item.icon && <i className={`${item.icon} icon`} /> }
                    { item.label }
                    { item.items && <i className="chevron right icon" /> }
                  </div>
                )
              }
            }) }
          </div>
        }
        { mode === 'teams'  &&
          <div className="chrome-navigation-header">
            <div className="chrome-navigation-header-back">
              <i className="users icon" />
            </div>
            <div className="chrome-navigation-header-title">
              Manage Teams
            </div>
            <div className="chrome-navigation-header-next" onClick={ this._handleToggleMode.bind(this) }>
              { mode === 'apps' && <i className="chevron down icon" /> }
              { mode === 'teams' && <i className="chevron up icon" /> }
            </div>
          </div>
        }
        { mode === 'teams' &&
          <div className="chrome-navigation-teams">
            { teams.map((team, index) => {
              return (
                <div key={`team_${index}`}className="chrome-navigation-team" onClick={ this._handleChangeTeam.bind(this, index) }>
                  <div className="chrome-navigation-team-logo">
                    <img src={ team.logo } />
                  </div>
                  <div className="chrome-navigation-team-title">
                    { team.title }
                  </div>
                  <div className="chrome-navigation-team-active" onClick={this._handleSignout.bind(this, index)}>
                    <i className="power icon" />
                  </div>
                </div>
              )
            })}
            <div className="chrome-navigation-team-add" onClick={ this._handleAddTeam.bind(this) }>
              <div className="chrome-navigation-team-add-button">
                <div className="chrome-navigation-team-add-button-image">
                  <i className="icon plus" />
                </div>
              </div>
              <div className="chrome-navigation-team-add-text">
                Add Team
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  _handleBrowse(item) {
    console.log('choose item '+item.label)
  }

  _handleToggleMode() {
    this.props.onToggleMode()
  }

  _handleChangeTeam(index) {
    this.context.admin.chooseTeam(index)
    this.props.onReset()
  }

  _handleAddTeam() {
    this.context.drawer.close()
    this.props.onReset()
    this.context.router.push({ pathname: '/admin/signin' })
  }

  _handleSignout(index) {
    if(this.props.team.length === 1) {
      this.context.drawer.close()
      window.setTimeout(() => {
        this.context.admin.removeTeam(index)
      }, 1000)
    } else {
      this.context.admin.removeTeam(index)
    }
  }

}

const mapStateToProps = state => ({
  active: state.admin.active,
  mode: state.navigation.mode,
  teams: state.admin.teams,
  team: getActiveTeam(state),
  user: getActiveUser(state)
})

const mapDispatchToProps = {
  onReset: actions.toggleMode,
  onToggleMode: actions.toggleMode
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
