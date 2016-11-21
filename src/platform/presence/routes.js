import React from 'react'
import { Route } from 'react-router'
import Session from './session'
import Activations from './components/activations'
import Signin from './components/signin'
import Reset from './components/reset'
import Resets from './components/resets'

export default (
  <Route component={Session}>
    <Route path="/admin/signin" component={Signin} />
    <Route path="/admin/reset" component={Reset} />
    <Route path="/admin/resets/:token" component={Resets} />
    <Route path="/admin/activations/:token" component={Activations} />
  </Route>
)
