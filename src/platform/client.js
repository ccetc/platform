import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Platform from './components/platform'
import Dashboard from './views/dashboard'
import Apps from './views/apps'
import Emails from './views/emails'
import Users from './views/users'
import Crm from '../apps/crm/client'
import Expenses from '../apps/expenses/client'

export default (
  <Route path="/" component={Platform}>
    <IndexRoute component={Dashboard} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="settings">
      {Apps}
      {Emails}
      {Users}
    </Route>
    <Route path="crm">
      {Crm}
    </Route>
    <Route path="expenses">
      {Expenses}
    </Route>
  </Route>
)
