import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './components/root'
import Cordova from 'portals/admin/components/cordova'
import Electron from 'portals/admin/components/electron'
import Browser from 'portals/admin/components/browser'
import Flash from 'portals/admin/components/flash'
import TeamContainer from './components/teams'
import Transition from './components/transition'

import Session from './components/session'
import Container from './components/container'
import Panel from './components/panel'
import Activation from './components/activation'
import Chrome from './components/chrome'
import Teams from './components/chrome/teams'
import Notifications from './components/notifications'
import Socket from './components/socket'
import Modal from './components/modal'
import Drawer from './components/drawer'
import Tasks from './components/tasks'
import Dashboard from './components/dashboard'
import NotificationsList from './components/notifications/list'
import ResetClaim from './components/reset/claim'
import ResetSecurity from './components/reset/security'
import ResetPassword from './components/reset/password'

import Team from './components/signin/team'
import Password from './components/signin/password'
import Email from './components/signin/email'

import TeamApp from 'platform/apps/team/admin/client'
import ReimbursementApp from 'apps/reimbursement/admin/client'
import NotFound from './components/page/not_found'

export default (
  <Route component={ Root }>
    <Route component={ Cordova }>
      <Route component={ Electron }>
        <Route component={ Browser }>
          <Route component={ Flash }>
            <Route component={ TeamContainer }>
              <Route component={ Transition }>
                <Route component={ Team } path="admin/signin" />
                <Route component={ Email } path="admin/signin/email" />
                <Route component={ Password } path="admin/signin/password" />
                <Route component={ Activation } path="admin/activation/:id" />
                <Route component={ ResetSecurity } path="admin/reset/security" />
                <Route component={ ResetPassword } path="admin/reset/password" />
                <Route component={ ResetClaim } path="admin/reset/:id" />
              </Route>
              <Route component={ Session }>
                <Route component={ Container }>
                  <Route component={ Notifications }>
                    <Route component={ Socket }>
                      <Route component={ Teams }>
                        <Route component={ Modal }>
                          <Route component={ Drawer }>
                            <Route component={ Tasks }>
                              <Route component={ Chrome } path="admin">
                                <Route component={ Transition }>
                                  <Route component={ Panel }>
                                    <IndexRoute component={ Dashboard } />
                                    <Route component={ NotificationsList } path="notifications" />
                                    {TeamApp}
                                    <Route path="reimbursement">
                                      {ReimbursementApp}
                                    </Route>
                                    <Route path="*" component={ NotFound }/>
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
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  </Route>
)
