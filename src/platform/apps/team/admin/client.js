import React from 'react'
import { Route, IndexRoute } from 'react-router'
import ActivitiesIndex from './views/activities/index'
import AppsIndex from './views/apps/index'
import AppsShow from './views/apps/show'
import AppAuthorShow from './views/apps/author'
import UsersIndex from './views/users/index'
import UsersShow from './views/users/show'
import UsersNew from './views/users/new'
import UsersEdit from './views/users/edit'

const routes = (
  <Route>
    <Route path="activities">
      <IndexRoute component={ActivitiesIndex} />
    </Route>
    <Route path="apps">
      <IndexRoute component={AppsIndex} />
      <Route path=":id" component={AppsShow} />
      <Route path="authors/:id" component={AppAuthorShow} />
    </Route>
    <Route path="users">
      <IndexRoute component={UsersIndex} />
      <Route path="new" component={UsersNew} />
      <Route path=":id" component={UsersShow} />
      <Route path=":id/edit" component={UsersEdit} />
    </Route>
  </Route>
)

export default routes
