import React from 'react'
import { Route } from 'react-router'
import Container from './platform/components/platform'
import Session from './platform/session'
import Chrome from './platform/components/chrome'
import Platform from './platform/admin'
import Crm from './apps/crm/admin'
import Expenses from './apps/expenses/admin'

export default (
  <Route component={Container}>
    {Session}
    <Route path="/admin" component={Chrome}>
      {Platform}
      <Route path="crm">
        {Crm}
      </Route>
      <Route path="expenses">
        {Expenses}
      </Route>
    </Route>
  </Route>
)
