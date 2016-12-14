import React from 'react'

export class Layout extends React.Component {

  render() {
    const { children } = this.props
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          { children }
        </div>
      </div>
    )
  }

}

export default Layout
