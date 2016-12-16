import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Transition from './transition'
import Panel from './panel'
import Dashboard from './dashboard'
import Team from 'platform/apps/team/admin/client'
import Reimbursement from 'apps/reimbursement/admin/client'
import NotFound from './not_found'

export default (
  <Route component={ Transition }>
    <Route component={ Panel }>
      <IndexRoute component={ Dashboard } />
      {Team}
      <Route path="reimbursement">
        {Reimbursement}
      </Route>
      <Route path="*" component={ NotFound }/>
    </Route>
  </Route>
)
