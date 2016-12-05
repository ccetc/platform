import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

class Modal extends React.Component {

  static childContextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const { children, modal } = this.props
    return (
      <div className="chrome-modal">
        { children }
        <CSSTransitionGroup transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
          { modal &&
            <div className="chrome-modal-window">
              { React.createElement(modal) }
            </div>
          }
        </CSSTransitionGroup>
      </div>
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

const mapStateToProps = state => ({
  modal: state.modal
})

const mapDispatchToProps = {
  open: actions.open,
  close: actions.close
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
