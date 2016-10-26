import React from 'react'
import Chrome from './components/chrome'

class Index extends React.Component {

  render() {
    return (
      <Chrome>
        {this.props.children}
      </Chrome>
    )
  }

}

export default Index
