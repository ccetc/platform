import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import CreateStore from 'server/utils/create_store'
import reducer from './reducer'
import Activation from './components/activation'
import Chrome from './components/chrome'
import Dashboard from './components/dashboard'
import Forgot from './components/forgot'
import Transition from './components/transition'
import Layout from './components/layout'
import ResetClaim from './components/reset/claim'
import ResetSecurity from './components/reset/security'
import ResetPassword from './components/reset/password'
import Session from './components/session'
import Signin from './components/signin'
import Instance from 'platform/apps/instance/admin/client'
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

class Panel extends React.Component {

  render() {
    const { children } = this.props
    return (
      <div className="chrome-panel">
        { children }
      </div>
    )
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

}

export default (
  <Route component={ Root }>
    <Route component={ Session }>
      <Route component={ Transition }>
        <Route component={ Layout }>
          <Route component={ Signin } path="admin/signin" />
          <Route component={ Forgot } path="admin/forgot" />
          <Route component={ Activation } path="admin/activation/:id" />
          <Route component={ ResetSecurity } path="admin/reset/security" />
          <Route component={ ResetPassword } path="admin/reset/password" />
          <Route component={ ResetClaim } path="admin/reset/:id" />
        </Route>
      </Route>
      <Route component={ Chrome } path="admin">
        <Route component={ Transition }>
          <Route component={ Panel }>
            <IndexRoute component={ Dashboard } />
            {Instance}
            <Route path="crm">
              {Crm}
            </Route>
            <Route path="expenses">
              {Expenses}
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  </Route>
)
