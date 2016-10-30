import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Platform from './components/platform'
import Dashboard from './views/dashboard'
import Crm from '../apps/crm/client'
import Expenses from '../apps/expenses/client'
import Settings from '../apps/settings/client'

export default (
  <Route path="/" component={Platform}>
    <IndexRoute component={Dashboard} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="crm">
      {Crm}
    </Route>
    <Route path="expenses">
      {Expenses}
    </Route>
    <Route path="settings">
      {Settings}
    </Route>
  </Route>
)
