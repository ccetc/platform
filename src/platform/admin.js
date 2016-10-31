import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Platform from './components/platform'
import Dashboard from './views/dashboard'
import Activities from './views/activities'
import Apps from './views/apps'
import Emails from './views/emails'
import Settings from './views/settings'
import Users from './views/users'
import Crm from '../apps/crm/admin'
import Expenses from '../apps/expenses/admin'

export default (
  <Route path="/admin" component={Platform}>
    <IndexRoute component={Dashboard} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="instance">
      {Activities}
      {Apps}
      {Emails}
      {Settings}
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
