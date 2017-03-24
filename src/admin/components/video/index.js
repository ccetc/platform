import React from 'react'

class Video extends React.Component {

  render() {
    return (
      <div className="chrome-video">
        <div>
          <iframe src={this.props.src} frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    )
  }

}

export default Video
