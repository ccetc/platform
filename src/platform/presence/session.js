import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

class Session extends React.Component {

  static propTypes: {
    user: React.PropTypes.object.isRequired
  }

  render() {
    const { children, location } = this.props
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <h1>MyCCE</h1>
          <h3>Cornell Cooperative Extension of Tompkins County</h3>
          <Transition transitionName="expanded" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            { React.cloneElement(children, { key: location.pathname }) }
          </Transition>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Session)
