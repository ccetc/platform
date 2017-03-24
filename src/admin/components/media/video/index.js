import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Video from 'admin/components/video'

class MediaImage extends React.Component {

  render() {
    const { video } = this.props
    return (
      <div className="media-video">
        <div className="media-video-toolbar">
          <div className="ui form">
            <input type="text" placeholder="Paste Video Url..." onKeyUp={ this._handlePreview.bind(this) } />
          </div>
        </div>
        <div className="media-video-canvas">
          { video &&
            <div className="media-video-wrapper">
              <Video src={video} />
            </div>
          }
        </div>
      </div>
    )
  }

  _handlePreview(event) {
    const url = this._convertUrl(event.target.value)
    this.props.onPreviewVideo(url)
  }

  _convertUrl(url) {
    const youtube = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g
    const vimeo = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?.?\/([0-9]+)/g
    if(url.match(youtube)) {
      return url.replace(youtube, 'https://www.youtube.com/embed/$1')
    } else if(url.match(vimeo)) {
      return url.replace(vimeo, 'https://player.vimeo.com/video/$1')
    }
  }


}

const mapStateToProps = (state, props) => ({
  video: state.media.video
})

const mapDispatchToProps = {
  onPreviewVideo: actions.previewVideo
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaImage)
