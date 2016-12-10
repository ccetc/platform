import React from 'react'

class Electron extends React.Component {

  static childContextTypes = {
    electron: React.PropTypes.object
  }

  static propTypes = {
  }

  render() {
    const { children } = this.props
    return <div>{ children }</div>
  }

  getChildContext() {
    return {
      electron: {
      }
    }
  }

}
export default Electron
