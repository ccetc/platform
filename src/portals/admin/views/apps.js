import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Transition from './transition'
import Panel from './panel'
import Dashboard from './dashboard'
import NotFound from './not_found'
import Team from 'platform/apps/team/admin/client.js'
import Reimbursement from 'workbench/reimbursement/admin/client.js'

export default (
  <Route component={ Transition }>
    <Route component={ Panel }>
      <IndexRoute component={ Dashboard } />
      <Route path="team">
        { Team }
      </Route>
      <Route path="reimbursement">
        { Reimbursement }
      </Route>
      <Route path="*" component={ NotFound }/>
    </Route>
  </Route>
)
