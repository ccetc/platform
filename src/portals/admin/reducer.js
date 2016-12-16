import _ from 'lodash'

import admin from './containers/admin/reducer'
import cordova from './containers/cordova/reducer'
import drawer from './containers/drawer/reducer'
import electron from './containers/electron/reducer'
import browser from './containers/browser/reducer'
import flash from './containers/flash/reducer'
import host from './containers/host/reducer'
import modal from './containers/modal/reducer'
import navigation from './containers/navigation/reducer'
import notifications from './containers/notifications/reducer'
import search from './containers/search/reducer'
import tasks from './containers/tasks/reducer'

import component from './components/component/reducer'

import reset from './session/reset/reducer'
import signin from './session/signin/reducer'

const platformReducers = {
  admin,
  browser,
  cordova,
  drawer,
  electron,
  flash,
  host,
  modal,
  navigation,
  notifications,
  reset,
  search,
  signin,
  tasks
}

export default (state, action) => {

  const namespace = action.type.split('/')[0]
  const is_platform = _.includes(Object.keys(platformReducers), namespace)

  if(state === undefined) {

    return {
      admin: admin(undefined, action),
      browser: browser(undefined, action),
      cordova: cordova(undefined, action),
      drawer: drawer(undefined, action),
      electron: electron(undefined, action),
      flash: flash(undefined, action),
      host: host(undefined, action),
      modal: modal(undefined, action),
      navigation: navigation(undefined, action),
      notifications: notifications(undefined, action),
      reset: reset(undefined, action),
      search: search(undefined, action),
      signin: signin(undefined, action),
      tasks: tasks(undefined, action),
      ...component(undefined, action)
    }

  } else if(is_platform) {

    return {
      ...state,
      [namespace]: platformReducers[namespace](state[namespace], action)
    }

  } else {

    return {
      ...state,
      ...component(state, action)
    }

  }

}
