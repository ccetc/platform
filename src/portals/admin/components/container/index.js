import React from 'react'

class Container extends React.Component {

  static childContextTypes = {
    container: React.PropTypes.object
  }

  render() {
    const { children } = this.props
    return (
      <div className="chrome-container">
        { children }
      </div>
    )
  }

  getChildContext() {
    return {
      container: {
        fetchResources: () => {},
        refreshResources: () => {}
      }
    }
  }

}

export default Container
