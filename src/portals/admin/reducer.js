import _ from 'lodash'

import admin from './containers/admin/reducer'
import browser from './containers/browser/reducer'
import container from './containers/container/reducer'
import cordova from './containers/cordova/reducer'
import drawer from './containers/drawer/reducer'
import electron from './containers/electron/reducer'
import flash from './containers/flash/reducer'
import history from './containers/history/reducer'
import host from './containers/host/reducer'
import modal from './containers/modal/reducer'
import notifications from './containers/notifications/reducer'
import tasks from './containers/tasks/reducer'
import tray from './containers/tray/reducer'

import component from './components/component/reducer'
import filter from './components/filter/reducer'

import navigation from './views/navigation/reducer'
import reset from './views/reset/reducer'
import search from './views/search/reducer'
import signin from './views/signin/reducer'

import access from 'platform/apps/team/admin/components/access/reducer'
import roles from 'platform/apps/team/admin/components/roles/reducer'


const platformReducers = {
  admin,
  browser,
  container,
  cordova,
  drawer,
  electron,
  flash,
  history,
  host,
  modal,
  filter,
  navigation,
  notifications,
  reset,
  search,
  signin,
  tasks,
  tray,
  access,
  roles
}

export default (state, action) => {

  const namespace = action.type.split('/')[0]
  const parts = namespace.split('.')
  const app = parts[0]
  const reducer = parts[parts.length - 1]
  const is_platform = _.includes(Object.keys(platformReducers), reducer)

  if(state === undefined) {

    return {
      admin: admin(undefined, action),
      browser: browser(undefined, action),
      container: container(undefined, action),
      cordova: cordova(undefined, action),
      drawer: drawer(undefined, action),
      electron: electron(undefined, action),
      flash: flash(undefined, action),
      history: history(undefined, action),
      host: host(undefined, action),
      modal: modal(undefined, action),
      filter: filter(undefined, action),
      navigation: navigation(undefined, action),
      notifications: notifications(undefined, action),
      reset: reset(undefined, action),
      search: search(undefined, action),
      signin: signin(undefined, action),
      tasks: tasks(undefined, action),
      tray: tray(undefined, action),
      access: access(undefined, action),
      roles: roles(undefined, action),
      ...component(undefined, action)
    }

  } else if(is_platform) {

    return {
      ...state,
      [reducer]: platformReducers[reducer](state[reducer], action)
    }

  } else {

    return {
      ...state,
      ...component(state, action)
    }

  }

}
