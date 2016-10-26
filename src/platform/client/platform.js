import React from 'react'

class Platform extends React.Component {

  render() {
    return (
      <div className="platform">
        <div className="platorm-drawer">
          <div className="platorm-branding">
            PLATFORM
          </div>
          <div className="platorm-apps">
            <div className="platorm-app">
              <i className="user icon"></i>
              Contacts
            </div>
            <div className="platorm-app">
              <i className="setting icon"></i>
              Settings
            </div>
          </div>
        </div>
        <div className="platorm-canvas">
          <div className="platorm-topbar">
            topbar
          </div>
          <a href="http://google.com">hey</a>
          {this.props.children}
        </div>
      </div>
    )
  }

}

export default Platform
