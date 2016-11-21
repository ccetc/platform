import React from 'react'
import { Provider } from 'react-redux'
import CreateStore from 'platform/store'
import Presence from './presence'
import reducer from './reducer'

class Platform extends React.Component {

  render() {
    const store = CreateStore(reducer)
    return (
      <Provider store={store}>
        <Presence>
          {this.props.children}
        </Presence>
      </Provider>
    )
  }

}

export default Platform
