import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import CreateStore from 'server/utils/create_store'
import reducer from './reducer'
import Activation from './components/activation'
import Chrome from './components/chrome'
import Dashboard from './components/dashboard'
import Forgot from './components/forgot'
import Gateway from './components/gateway'
import Reset from './components/reset'
import Session from './components/session'
import Signin from './components/signin'
import Crm from 'apps/crm/admin/client'
import Expenses from 'apps/expenses/admin/client'

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

export default (
  <Route component={ Root }>
    <Route component={ Session }>
      <Route component={ Gateway }>
        <Route component={ Signin } path="admin/signin" />
        <Route component={ Forgot } path="admin/forgot" />
      </Route>
      <Route component={ Activation } path="admin/activation/:id" />
      <Route component={ Reset } path="admin/reset/:id" />
      <Route component={ Chrome } path="admin">
        <IndexRoute component={ Dashboard } />
          <Route path="crm">
            {Crm}
          </Route>
          <Route path="expenses">
            {Expenses}
          </Route>
      </Route>
    </Route>
  </Route>
)