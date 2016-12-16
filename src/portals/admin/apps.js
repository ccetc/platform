import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Dashboard from './containers/dashboard'
import Team from 'platform/apps/team/admin/client'
import Reimbursement from 'apps/reimbursement/admin/client'
import NotFound from './containers/page/not_found'

export default (
  <Route>
    <IndexRoute component={ Dashboard } />
    {Team}
    <Route path="reimbursement">
      {Reimbursement}
    </Route>
    <Route path="*" component={ NotFound }/>
  </Route>
)
