import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

class Modal extends React.Component {

  render() {
    const { modal } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
        { modal &&
          <div className="chrome-modal">
            { React.createElement(modal) }
          </div>
        }
      </Transition>
    )
  }

}

const mapStateToProps = (state) => ({
  modal: state.chrome.modal
})

export default connect(mapStateToProps)(Modal)
