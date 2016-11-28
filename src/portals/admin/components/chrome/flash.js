
import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Flash extends React.Component {

  static propTypes: {
    message: React.PropTypes.string.isRequired,
    style: React.PropTypes.string.isRequired,
    onSet: React.PropTypes.func.isRequired,
    onClear: React.PropTypes.func.isRequired
  }

  render() {
    const { message, style } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        {message &&
          <div className={`chrome-flash ${style}`}>
            <p>
              { this._getIcon(style) }
              {message}
            </p>
          </div>
        }
      </Transition>
    )
  }

  componentDidUpdate(prevProps) {
    const { message, onClear } = this.props
    if(prevProps.message !== message && message) {
      window.setTimeout(onClear, 1500)
    }
  }

  _getIcon(style) {
    if(style == 'success') {
      return <i className="check circle icon" />
    } else if(style == 'info') {
      return <i className="info circle icon" />
    } else if(style == 'warning') {
      return <i className="warning sign icon" />
    } else if(style == 'error') {
      return <i className="remove circle icon" />
    }
  }

}

const mapStateToProps = (state) => ({
  style: state.chrome.flash.style,
  message: state.chrome.flash.message
})

const mapDispatchToProps = {
  onSet: actions.set,
  onClear: actions.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash)
