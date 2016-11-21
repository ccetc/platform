
import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Flash extends React.Component {

  static propTypes: {
    message: React.PropTypes.string.isRequired,
    style: React.PropTypes.string.isRequired,
    onClear: React.PropTypes.func.isRequired
  }

  render() {
    const { message, style } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        {message &&
          <div className={`chrome-flash ${style}`}>
            <p>{message}</p>
          </div>
        }
      </Transition>
    )
  }

  componentDidMount() {
    const { message, onClear } = this.props
    if(message) {
      setTimeout(onClear, 5000)
    }
  }

}

const mapStateToProps = (state) => ({
  style: state.flash.style,
  message: state.flash.message
})

const mapDispatchToProps = {
  onClear: actions.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash)
