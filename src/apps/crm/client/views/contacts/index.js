import React from 'react'
import { Route, IndexRoute } from 'react-router'
import List from './list'
import Show from './show'

const routes = (
  <Route path="contacts">
    <IndexRoute component={List} />
    <Route path=":id" component={Show} />
  </Route>
)

export default routes
