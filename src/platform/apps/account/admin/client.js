import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Account from './views/account'

const routes = (
  <Route>
    <IndexRoute component={Account} />
  </Route>
)

export default routes
