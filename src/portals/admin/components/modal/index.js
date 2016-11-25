import React from 'react'
import Transition from 'react-addons-css-transition-group'

class Modal extends React.Component {

  render() {
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        <div className="chrome-modal">
          <div className="chrome-modal-header">
            <div className="chrome-modal-header-left">
              Cancel
            </div>
            <div className="chrome-modal-header-right">
              Save
            </div>
          </div>
          <div className="chrome-modal-body">
          <p>
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          One<br />
          </p>
          </div>
        </div>
      </Transition>
    )
  }

}

export default Modal
