import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

class Modal extends React.Component {

  static childContextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const { children, modal } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
        { children }
        { modal &&
          <div className="chrome-modal">
            { React.createElement(modal) }
          </div>
        }
      </Transition>
    )
  }

  getChildContext() {
    const { open, close } = this.props
    return {
      modal: {
        open,
        close
      }
    }
  }

}

const mapStateToProps = (state) => ({
  modal: state.modal
})
const mapDispatchToProps = {
  open: actions.open,
  close: actions.close
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
