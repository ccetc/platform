import React from 'react'

class Platform extends React.Component {

  render() {
    return (
      <div className="platform">
        {this.props.children}
      </div>
    )
  }

}

export default Platform
