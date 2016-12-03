import React from 'react'
import { Provider } from 'react-redux'
import CreateStore from 'server/utils/create_store'
import reducer from './reducer'

class Root extends React.Component {

  render() {
    const store = CreateStore(reducer)
    return (
      <Provider store={ store }>
        {this.props.children}
      </Provider>
    )
  }

}

export default Root
