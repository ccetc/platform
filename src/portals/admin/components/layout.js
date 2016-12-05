import React from 'react'

export class Layout extends React.Component {

  static contextTypes = {
    instance: React.PropTypes.object
  }

  render() {
    const { children } = this.props
    const { title, subtitle, logo } = this.context.instance
    return (
      <div className="chrome-session">
        <div className="chrome-session-widget">
          <img src={ logo } />
          <h1>{ title }</h1>
          <h3>{ subtitle }</h3>
          { children }
        </div>
      </div>
    )
  }

}

export default Layout
