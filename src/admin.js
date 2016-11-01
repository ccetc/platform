import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Platform from './platform/components/platform'
import Dashboard from './platform/views/dashboard'
import Instance from './platform/admin'
import Crm from './apps/crm/admin'
import Expenses from './apps/expenses/admin'

export default (
  <Route path="/admin" component={Platform}>
    <IndexRoute component={Dashboard} />
    <Route path="instance">
      {Instance}
    </Route>
    <Route path="crm">
      {Crm}
    </Route>
    <Route path="expenses">
      {Expenses}
    </Route>
  </Route>
)
