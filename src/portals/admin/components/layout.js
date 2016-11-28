import React from 'react'

export class Layout extends React.Component {

  render() {
    const { children } = this.props
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <h1>MyCCE</h1>
          <h3>Cornell Cooperative Extension of Tompkins County</h3>
          { children }
        </div>
      </div>
    )
  }

}

export default Layout
