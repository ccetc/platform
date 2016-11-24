import React from 'react'
import { Route, IndexRoute } from 'react-router'
import ContactsIndex from './views/contacts/index'
import ContactsShow from './views/contacts/show'

const routes = (
  <Route>
    <Route path="contacts">
      <IndexRoute component={ContactsIndex} />
      <Route path=":id" component={ContactsShow} />
    </Route>
  </Route>
)

export default routes
