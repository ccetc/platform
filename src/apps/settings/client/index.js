import React from 'react'
import { Route } from 'react-router'
import Apps from './views/apps'
import Emails from './views/emails'
import Users from './views/users'

export default (
  <Route path="settings">
    {Apps}
    {Emails}
    {Users}
  </Route>
)
