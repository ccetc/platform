import React from 'react'
import Session from './components/session'
import Chrome from './components/chrome'

class Index extends React.Component {

  render() {
    return (
      <div>
        <Session />
        <Chrome>
          {this.props.children}
        </Chrome>
      </div>
    )
  }

}

export default Index
