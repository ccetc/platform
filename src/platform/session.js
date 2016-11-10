import React from 'react'
import { Route } from 'react-router'
import Session from './views/session'
import Signin from './views/signin'
import Reset from './views/reset'

export default (
  <Route component={Session}>
    <Route path="/admin/signin" component={Signin} />
    <Route path="/admin/reset" component={Reset} />
    <Route path="/admin/resets/:token" component={Reset} />
    <Route path="/admin/resets" component={Reset} />
    <Route path="/admin/activations/:token" component={Reset} />
    <Route path="/admin/activations" component={Reset} />
  </Route>
)
