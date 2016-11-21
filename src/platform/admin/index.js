import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Dashboard from './views/dashboard'
import Notifications from './views/notifications'

export default (
  <Route>
    <IndexRoute component={Dashboard} />
    {Notifications}
  </Route>
)
