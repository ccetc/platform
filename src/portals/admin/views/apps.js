import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Transition from './transition'
import Panel from './panel'
import Dashboard from './dashboard'
import NotFound from './not_found'
import Expenses from 'apps/expenses/admin/client.js'
import Team from 'platform/apps/team/admin/client.js'

export default (
  <Route component={ Transition }>
    <Route component={ Panel }>
      <IndexRoute component={ Dashboard } />
      <Route path="expenses">
        { Expenses }
      </Route>
      <Route path="team">
        { Team }
      </Route>
      <Route path="*" component={ NotFound }/>
    </Route>
  </Route>
)
