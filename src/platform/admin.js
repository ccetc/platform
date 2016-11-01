import React from 'react'
import { Route } from 'react-router'
import Activities from './views/activities'
import Apps from './views/apps'
import Emails from './views/emails'
import Settings from './views/settings'
import Users from './views/users'

export default (
  <Route>
    {Activities}
    {Apps}
    {Emails}
    {Settings}
    {Users}
  </Route>
)
