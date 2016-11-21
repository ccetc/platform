import React from 'react'
import { Route, IndexRoute } from 'react-router'
import List from './list'

const routes = (
  <Route path="trips">
    <IndexRoute component={List} />
  </Route>
)

export default routes
