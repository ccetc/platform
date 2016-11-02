import React from 'react'
import { Route } from 'react-router'
import Container from './platform/components/platform'
import Chrome from './platform/components/chrome'
import Signin from './platform/views/signin'
import Reset from './platform/views/reset'
import Platform from './platform/admin'
import Crm from './apps/crm/admin'
import Expenses from './apps/expenses/admin'

export default (
  <Route component={Container}>
    <Route path="/admin/signin" component={Signin} />
    <Route path="/admin/reset" component={Reset} />
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
