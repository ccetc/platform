import React from 'react'
import { connect } from 'react-redux'
import { getActiveUser } from '../admin/selectors'
import Topbar from './topbar'
// import Notifications from '../notifications'

export class Chrome extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    teams: React.PropTypes.array,
    user: React.PropTypes.object
  }

  render() {
    const { children, teams, user } = this.props
    if(!user || teams.length === 0) return null
    return (
      <div className="chrome">
        <Topbar />
        <div className="chrome-workspace">
          { children }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleRedirect(this.props.teams)
  }

  componentWillReceiveProps(nextProps) {
    this._handleRedirect(nextProps.teams)
  }

  _handleRedirect(teams) {
    if(teams.length === 0) {
      this.context.router.push({ pathname: '/admin/signin' })
    }
  }

}

const mapStateToProps = (state, props) => ({
  teams: state.admin.teams,
  user: getActiveUser(state)
})

export default connect(mapStateToProps)(Chrome)
