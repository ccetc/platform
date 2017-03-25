import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import Image from './image'
import Video from './video'

class Media extends React.Component {

  render() {
    const { mode } = this.props
    if(mode === 'image') {
      return <Image />
    } else if(mode === 'video') {
      return <Video />
    }
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
          <a onClick={ this._changeMode.bind(this, 'image')}>Image</a>
          <a onClick={ this._changeMode.bind(this, 'video')}>Video</a>
        </div>
      </div>
    )
  }

  _changeMode(mode) {
    this.props.onChangeMode(mode)
  }

}

const mapStateToProps = (state, props) => ({
  mode: state.media.mode
})

const mapDispatchToProps = {
  onChangeMode: actions.changeMode
}

export default connect(mapStateToProps, mapDispatchToProps)(Media)
