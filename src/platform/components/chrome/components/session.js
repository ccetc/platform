import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import Signin from './signin'
import Reset from './reset'

class Session extends React.Component {

  static propTypes: {
    user: React.PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        { !user &&
          <div className="chrome-session">
            <Signin />
            <Reset />
          </div>
        }
      </Transition>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.chrome.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Session)
