import React from 'react'
import { Route } from 'react-router'
import Container from './platform/components/platform'
import Platform from './platform/admin'
import Crm from './apps/crm/admin'
import Expenses from './apps/expenses/admin'

export default (
  <Route path="/admin" component={Container}>
    {Platform}
    <Route path="crm">
      {Crm}
    </Route>
    <Route path="expenses">
      {Expenses}
    </Route>
  </Route>
)
