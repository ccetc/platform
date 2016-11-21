import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Password from './password'
import Edit from './edit'

const routes = (
  <Route path="account">
    <IndexRoute component={Edit} />
    <Route path="password" component={Password}  />
  </Route>
)

export default routes
