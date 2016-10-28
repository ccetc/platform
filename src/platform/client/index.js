import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Platform from './platform'
import Dashboard from './views/dashboard'
import CRM from '../../apps/crm/client'
import Settings from '../../apps/settings/client'

export default (
  <Route path="/" component={Platform}>
    <IndexRoute component={Dashboard} />
    <Route path="dashboard" component={Dashboard} />
    {CRM}
    {Settings}
  </Route>
)
