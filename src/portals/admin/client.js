import React from 'react'
import { Route } from 'react-router'
import Root from './root'
import Socket from './containers/socket'
import Host from './containers/host'
import Admin from './containers/admin'
import Notifications from './containers/notifications'
import Flash from './containers/flash'
import Transition from './containers/transition'
import Session from './session'
import Teams from './containers/chrome/teams'
import Container from './containers/container'
import Modal from './containers/modal'
import Drawer from './containers/drawer'
import Tasks from './containers/tasks'
import Chrome from './containers/chrome'
import Panel from './containers/panel'
import Apps from './apps'

export default (
  <Route component={ Root }>
    <Route component={ Socket }>
      <Route component={ Host }>
        <Route component={ Admin }>
          <Route component={ Notifications }>
            <Route component={ Flash }>
              <Route component={ Transition }>
                { Session }
                <Route component={ Teams } path="admin">
                  <Route component={ Container }>
                    <Route component={ Modal }>
                      <Route component={ Drawer }>
                        <Route component={ Tasks }>
                          <Route component={ Chrome }>
                            <Route component={ Transition }>
                              <Route component={ Panel }>
                                { Apps }
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
