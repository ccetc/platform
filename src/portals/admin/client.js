import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './components/root'
import Session from './components/session'
import Container from './components/container'
import Panel from './components/panel'
import Activation from './components/activation'
import Chrome from './components/chrome'
import Modal from './components/modal'
import Drawer from './components/drawer'
import Tasks from './components/tasks'
import Dashboard from './components/dashboard'
import Notifications from './components/notifications/list'
import Forgot from './components/forgot'
import Transition from './components/transition'
import Layout from './components/layout'
import ResetClaim from './components/reset/claim'
import ResetSecurity from './components/reset/security'
import ResetPassword from './components/reset/password'
import Signin from './components/signin'
import Instance from 'platform/apps/instance/admin/client'
import Expenses from 'apps/expenses/admin/client'

export default (
  <Route component={ Root }>
    <Route component={ Session }>
      <Route component={ Container }>
        <Route component={ Transition }>
          <Route component={ Layout }>
            <Route component={ Signin } path="admin/signin" />
            <Route component={ Forgot } path="admin/forgot" />
            <Route component={ Activation } path="admin/activation/:id" />
            <Route component={ ResetSecurity } path="admin/reset/security" />
            <Route component={ ResetPassword } path="admin/reset/password" />
            <Route component={ ResetClaim } path="admin/reset/:id" />
          </Route>
        </Route>
        <Route component={ Modal }>
          <Route component={ Drawer }>
            <Route component={ Tasks }>
              <Route component={ Chrome } path="admin">
                <Route component={ Transition }>
                  <Route component={ Panel }>
                    <IndexRoute component={ Dashboard } />
                    <Route component={ Notifications } path="notifications" />
                    {Instance}
                    <Route path="expenses">
                      {Expenses}
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  </Route>
)
