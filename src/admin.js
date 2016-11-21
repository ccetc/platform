import React from 'react'
import { Route } from 'react-router'
import Root from 'platform/root'
import Chrome from 'platform/admin/components/chrome'
import Presence from 'platform/presence/routes'
import Platform from 'platform/admin'
import Account from 'apps/account/admin'
import Instance from 'apps/instance/admin'
import Crm from 'apps/crm/admin'
import Expenses from 'apps/expenses/admin'

export default (
  <Route component={Root}>
    {Presence}
    <Route path="admin" component={Chrome}>
      {Platform}
      <Route path="account">
        {Account}
      </Route>
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
  </Route>
)
