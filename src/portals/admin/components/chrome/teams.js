import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

export class Teams extends React.Component {

  static contextTypes = {
    admin: React.PropTypes.object
  }

  static propTypes = {
    active: React.PropTypes.number,
    admin: React.PropTypes.array
  }

  render() {
    const { active, children, sessions, teams } = this.props
    return (
      <div className="chrome-teams">
        <div className="chrome-teams-panel">
          { teams.map((team, index) => {
            return (
              <div key={`team_${index}`} className={`chrome-team ${(index === active) ? 'active' : ''}`} title={ team.title } onClick={this._handleChoose.bind(this, index)}>
                <img src={ team.logo } />
                { sessions[team.id] && sessions[team.id].user.unread > 0 &&
                  <div className="chrome-team-label">{ sessions[team.id].user.unread }</div>
                }
              </div>
            )
          }) }
          <Link className="chrome-teams-add" to={{ pathname: '/admin/signin', state: 'fade' }} title="Sign in to another team...">
            <div className="chrome-teams-add-button">
              <i className="plus icon" />
            </div>
          </Link>
        </div>
        <div className="chrome-teams-workspace">
          { children }
        </div>
      </div>
    )
  }

  _handleChoose(index) {
    this.context.admin.chooseTeam(index)
  }

}

const mapStateToProps = state => ({
  active: state.admin.active,
  sessions: state.admin.sessions,
  teams: state.admin.teams
})

export default connect(mapStateToProps)(Teams)
