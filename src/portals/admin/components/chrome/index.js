import React from 'react'
import { connect } from 'react-redux'
import Topbar from './topbar'
import Notifications from '../notifications'

export class Chrome extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    token: React.PropTypes.string,
    user: React.PropTypes.object
  }

  render() {
    const { children, user } = this.props
    if(!user) {
      return null
    }
    return (
      <div className="chrome">
        <Topbar />
        { children }
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.session.user
})

export default connect(mapStateToProps)(Chrome)
