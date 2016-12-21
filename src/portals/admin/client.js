import React from 'react'
import { Route } from 'react-router'
import Root from './root'
import Socket from './containers/socket'
import Host from './containers/host'
import Admin from './containers/admin'
import Notifications from './containers/notifications'
import Flash from './containers/flash'
import Session from './views/session'
import Teams from './containers/chrome/teams'
import Container from './containers/container'
import Modal from './containers/modal'
import Drawer from './containers/drawer'
import Tasks from './containers/tasks'
import Chrome from './containers/chrome'
import Apps from './views/apps'

export default (
  <Route component={ Root }>
    <Route component={ Socket }>
      <Route component={ Notifications }>
        <Route component={ Host }>
          <Route component={ Flash }>
            <Route component={ Admin }>
              { Session }
              <Route component={ Container } path="admin">
                <Route component={ Modal }>
                  <Route component={ Drawer }>
                    <Route component={ Tasks }>
                      <Route component={ Chrome }>
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
)
