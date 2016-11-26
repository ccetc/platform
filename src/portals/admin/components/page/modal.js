import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

class Modal extends React.Component {

  static childContextTypes = {
    modal: React.PropTypes.object
  }

  getChildContext() {
    return {
      modal: {
        open: this._handleOpen.bind(this),
        close: this._handleClose.bind(this)
      }
    }
  }

  render() {
    const { open } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
        { open &&
          <div className="chrome-modal">
            { this.props.children }
          </div>
        }
      </Transition>
    )
  }

  _handleOpen() {
    this.props.onOpenModal()
  }

  _handleClose() {
    this.props.onCloseModal()
  }

}

const mapStateToProps = (state) => ({
  open: state.modal
})

const mapDispatchToProps = {
  onOpenModal: actions.openModal,
  onCloseModal: actions.closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
