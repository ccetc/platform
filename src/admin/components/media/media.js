import React from 'react'
import Image from './image'

class Media extends React.Component {

  render() {
    return (
      <div className="chrome-modal-panel">
        <div className="chrome-modal-panel-header">
          <div className="chrome-modal-panel-header-cancel">
            Back
          </div>
          <div className="chrome-modal-panel-header-title">
            Media
          </div>
          <div className="chrome-modal-panel-header-proceed">
            Next
          </div>
        </div>
        <div className="chrome-modal-panel-body">
          <Image />
        </div>
      </div>
    )
  }

}

export default Media
