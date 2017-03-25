import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Image from 'admin/components/image'
import Crop from './crop'
import Brightness from './brightness'
import Contrast from './contrast'
import Hue from './hue'
import Saturation from './saturation'
import Blur from './blur'

class MediaImage extends React.Component {

  render() {
    const tools = [
      { label: 'Crop', icon: 'crop', component: Crop },
      { label: 'Orientation', icon: 'repeat', tools: [
        { label: 'Horizontal', icon: 'resize horizontal', handler: this._handleFlip.bind(this, 'horizontal') },
        { label: 'Vertical', icon: 'resize vertical', component: this._handleFlip.bind(this, 'vertical') },
        { label: 'Rotate CW', icon: 'repeat', handler: this._handleRotate.bind(this, 90) },
        { label: 'Rotate CCW', icon: 'repeat', component: this._handleRotate.bind(this, -90) }
      ] },
      { label: 'Adjustments', icon: 'options', tools: [
        { label: 'Brightness', icon: 'sun', component: Brightness },
        { label: 'Contrast', icon: 'adjust', component: Contrast },
        { label: 'Hue', icon: 'diamond', component: Hue },
        { label: 'Saturation', icon: 'percent', component: Saturation }
      ] },
      { label: 'Effects', icon: 'star', tools: [
        { label: 'Blur', icon: 'search', component: Blur }
      ] }
    ]
    const { operations, tool } = this.props
    return (
      <div className="chrome-modal-panel">
        <div className="chrome-modal-panel-header">
          <div className="chrome-modal-panel-header-cancel" onClick={ this._changeMode.bind(this, null)}>
            Back
          </div>
          <div className="chrome-modal-panel-header-title">
            Edit Image
          </div>
          <div className="chrome-modal-panel-header-proceed">
          </div>
        </div>
        <div className="chrome-modal-panel-body">
          <div className="media-image">
            <div className="media-image-toolbar">
              <div className="media-image-tools">
                { tool !== null &&
                  <div className="media-image-tool" onClick={this._handleChangeTool.bind(this, null)}>
                    <i className="icon chevron left"></i><br />
                    Back
                  </div>
                }
                {tools.map((tool, index) => {
                  return (
                    <div key={`tool_${index}`} className="media-image-tool" onClick={this._handleChangeTool.bind(this, index)}>
                      <i className={`icon ${tool.icon}`}></i><br />
                      { tool.label }
                    </div>
                  )
                })}
              </div>
              <div className="media-image-undo">
                <div className="media-image-tool" onClick={this._handleUndoChanges.bind(this)}>
                  <i className="icon undo"></i><br />
                  Undo
                </div>
              </div>
            </div>
            <div className="media-image-canvas">
              <div className="media-image-wrapper">
                <Image src="/images/fireworks.jpg" transforms={{ ops: operations }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _changeMode(mode) {
    this.props.onChangeMode(mode)
  }

  _handleChangeTool(tool) {
    this.props.onChangeTool(tool)
  }

  _handleRotate(rot) {
    this.props.onPushOperation({ rot })
  }

  _handleFlip(flip) {
    this.props.onPushOperation({ flip })
  }

  _handleUndoChanges() {
    this.props.onPopOperation()
  }

}

const mapStateToProps = (state, props) => ({
  mode: state.media.mode,
  operations: state.media.operations,
  tool: state.media.tool
})

const mapDispatchToProps = {
  onChangeMode: actions.changeMode,
  onChangeTool: actions.changeTool,
  onPushOperation: actions.pushOperation,
  onPopOperation: actions.popOperation
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaImage)
