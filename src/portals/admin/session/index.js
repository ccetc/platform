import React from 'react'
import { Route } from 'react-router'

import SigninTeam from './signin/team'
import SigninPassword from './signin/password'
import SigninEmail from './signin/email'
import Activation from './activation'
import ResetClaim from './reset/claim'
import ResetSecurity from './reset/security'
import ResetPassword from './reset/password'

export default (
  <Route>
    <Route component={ SigninTeam } path="admin/signin" />
    <Route component={ SigninEmail } path="admin/signin/email" />
    <Route component={ SigninPassword } path="admin/signin/password" />
    <Route component={ Activation } path="admin/activation/:id" />
    <Route component={ ResetSecurity } path="admin/reset/security" />
    <Route component={ ResetPassword } path="admin/reset/password" />
    <Route component={ ResetClaim } path="admin/reset/:id" />
  </Route>
)
