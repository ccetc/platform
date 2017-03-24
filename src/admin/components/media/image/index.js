import React from 'react'
import Image from 'admin/components/image'

class MediaImage extends React.Component {

  render() {
    return (
      <div className="media-image">
        <div className="media-image-toolbar">
          <div className="media-image-tool" onClick={this._handleChangeTool.bind(this, 'crop')}>
            <i className="icon crop"></i><br />
            Crop
          </div>
          <div className="media-image-tool" onClick={this._handleChangeTool.bind(this, 'rotation')}>
            <i className="icon repeat"></i><br />
            Rotation
          </div>
          <div className="media-image-tool" onClick={this._handleChangeTool.bind(this, 'flip')}>
            <i className="icon move"></i><br />
            Flip
          </div>
          <div className="media-image-tool" onClick={this._handleChangeTool.bind(this, 'brightness')}>
            <i className="icon sun"></i><br />
            Brightness
          </div>
          <div className="media-image-tool" onClick={this._handleChangeTool.bind(this, 'contrast')}>
            <i className="icon adjust"></i><br />
            Contrast
          </div>
          <div className="media-image-tool" onClick={this._handleChangeTool.bind(this, 'hue')}>
            <i className="icon diamond"></i><br />
            Hue
          </div>
          <div className="media-image-tool" onClick={this._handleChangeTool.bind(this, 'blur')}>
            <i className="icon search"></i><br />
            Blur
          </div>
          <div className="media-image-tool" onClick={this._handleUndoChanges.bind(this)}>
            <i className="icon undo"></i><br />
            Undo
          </div>
        </div>
        <div className="media-image-canvas">
          <Image src="/images/fireworks.jpg" transforms={{ w: 768 }} />
        </div>
      </div>
    )
  }

  _handleChangeTool() {

  }

  _handleUndoChanges() {

  }

}

export default MediaImage
