import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Dashboard from './views/dashboard'
import Notifications from './views/notifications'
import Account from './views/account'
import Activities from './views/activities'
import Apps from './views/apps'
import Emails from './views/emails'
import Settings from './views/settings'
import Users from './views/users'

export default (
  <Route>
    <IndexRoute component={Dashboard} />
    {Notifications}
    {Account}
    <Route path="instances">
      {Activities}
      {Apps}
      {Emails}
      {Settings}
      {Users}
    </Route>
  </Route>
)
