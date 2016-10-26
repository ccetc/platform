import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import CreateStore from './store'
import reducer from './reducer'
import Chrome from './components/chrome'
import Dashboard from './views/dashboard'
import CRM from '../../apps/crm/client'
import Settings from '../../apps/settings/client'

class Platform extends React.Component {

  render() {
    const store = CreateStore(reducer)
    return (
      <Provider store={store}>
        <Chrome {...this.props}>
          {this.props.children}
        </Chrome>
      </Provider>
    )
  }

}

export default (
  <Route path="/" component={Platform}>
    <IndexRoute component={Dashboard} />
    <Route path="dashboard" component={Dashboard} />
    {CRM}
    {Settings}
  </Route>
)
