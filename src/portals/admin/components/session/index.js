import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

class Session extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
    flash: React.PropTypes.object
  }

  static propTypes = {
    active: React.PropTypes.number,
    status: React.PropTypes.string,
    admin: React.PropTypes.array,
    user: React.PropTypes.object,
    onLoad: React.PropTypes.func.isRequired
  }

  render() {
    const { children, teams } = this.props
    return (teams.length > 0) ? children : null
  }

  componentDidMount() {
    const { teams } = this.props
    if(teams.length === 0) {
      this.context.router.push({ pathname: '/admin/signin' })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { status, teams } = nextProps
    if(this.props.status !== status) {
      if(status === 'failure') {
        this.props.signout()
      }
    } else if(teams.length === 0)  {
      this.context.router.push({ pathname: '/admin/signin' })
    }
  }

  _isExternalRoute() {
    const { location } = this.props
    const parts = location.pathname.split('/')
    const context = (parts.length > 2) ? parts[2] : null
    return _.includes(['signin','forgot','reset','activation'], context)
  }

}

const mapStateToProps = (state, props) => ({
  active: state.admin.active,
  status: state.session.status,
  teams: state.admin.teams,
  user: state.session.user
})

const mapDispatchToProps = {
  onLoad: actions.load
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)
