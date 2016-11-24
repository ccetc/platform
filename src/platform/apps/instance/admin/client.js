import React from 'react'
import { Route, IndexRoute } from 'react-router'
import UsersIndex from './views/users/index'
import UsersShow from './views/users/show'

const routes = (
  <Route>
    <Route path="users">
      <IndexRoute component={UsersIndex} />
      <Route path=":id" component={UsersShow} />
    </Route>
  </Route>
)

export default routes
