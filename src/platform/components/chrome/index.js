import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'
import Flash from './components/flash'
import Drawer from './components/drawer'
import Topbar from './components/topbar'
import Notifications from '../notifications'

export class Chrome extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes: {
    user: React.PropTypes.object.isRequired,
    onSetFlash: React.PropTypes.func.isRequired
  }

  render() {
    const { user } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
        { user &&
          <div className="chrome">
            <Flash />
            <Drawer />
            <div className="chrome-canvas">
              <Topbar />
              {this.props.children}
              <Notifications />
            </div>
          </div>
        }
      </Transition>
    )
  }

  componentDidMount() {
    if(!this.props.user) {
      this.context.router.push('/admin/signin')
    }
  }

}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  onSetFlash: actions.setFlash
}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
