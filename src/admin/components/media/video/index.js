import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Video from 'admin/components/video'

class MediaVideo extends React.Component {

  render() {
    const { video } = this.props
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
          <div className="media-video">
            <div className="media-video-toolbar">
              <div className="ui form">
                <input type="text" placeholder="Paste a YouTube or Vimeo Url..." onKeyUp={ this._handlePreview.bind(this) } />
              </div>
            </div>
            <div className="media-video-canvas">
                { video && video !== 'error' &&
                  <div className="media-video-wrapper">
                    <Video src={video} /> }
                  </div>
                }
                { video && video === 'error' &&
                  <div className="media-video-wrapper">
                    <p>Invalid Video URL. We can handle the following video formats:</p>
                    <ul>
                      <li>YouTube: https://www.youtube.com/watch?v=NrpFddBWMrw</li>
                      <li>Vimeo: http://vimeo.com/75307795</li>
                      <li>MP4, M4V, WebM, FLV, WMV</li>
                    </ul>
                  </div>
                }
            </div>
          </div>
        </div>
      </div>
    )
  }

  _handlePreview(event) {
    const url = this._convertUrl(event.target.value)
    this.props.onPreviewVideo(url)
  }

  _changeMode(mode) {
    this.props.onChangeMode(mode)
  }

  _convertUrl(url) {
    const youtube = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^&]+)/g
    const vimeo = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?.?\/([0-9]+)/g
    if(url.match(youtube)) {
      return url.replace(youtube, 'https://www.youtube.com/embed/$1')
    } else if(url.match(vimeo)) {
      return url.replace(vimeo, 'https://player.vimeo.com/video/$1')
    } else {
      return 'error'
    }
  }


}

const mapStateToProps = (state, props) => ({
  video: state.media.video
})

const mapDispatchToProps = {
  onChangeMode: actions.changeMode,
  onPreviewVideo: actions.previewVideo
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaVideo)
