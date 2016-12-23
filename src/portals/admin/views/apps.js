import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Transition from './transition'
import Panel from './panel'
import Dashboard from './dashboard'
import NotFound from './not_found'
import AppComponents from './applications.gen.js'

export default (
  <Route component={ Transition }>
    <Route component={ Panel }>
      <IndexRoute component={ Dashboard } />
      {AppComponents.map(app => (
        <Route path={app.path}>
          {app.component}
        </Route>
      ))}
      <Route path="*" component={ NotFound }/>
    </Route>
  </Route>
)
