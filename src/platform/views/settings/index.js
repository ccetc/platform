import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Edit from './edit'

const routes = (
  <Route path="settings">
    <IndexRoute component={Edit} />
  </Route>
)

export default routes
