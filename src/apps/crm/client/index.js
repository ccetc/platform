import React from 'react'
import { Route } from 'react-router'
import contacts from './views/contacts'

const routes = (
  <Route path="crm">
    {contacts}
  </Route>
)

export default routes
