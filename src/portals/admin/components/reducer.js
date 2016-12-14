import _ from 'lodash'

import admin from './admin/reducer'
import cordova from 'portals/admin/components/cordova/reducer'
import component from 'portals/admin/components/component/reducer'
import drawer from 'portals/admin/components/drawer/reducer'
import electron from 'portals/admin/components/electron/reducer'
import browser from 'portals/admin/components/browser/reducer'
import flash from 'portals/admin/components/flash/reducer'
import modal from 'portals/admin/components/modal/reducer'
import navigation from 'portals/admin/components/navigation/reducer'
import notifications from 'portals/admin/components/notifications/reducer'
import reset from './reset/reducer'
import search from './search/reducer'
import signin from './signin/reducer'
import tasks from './tasks/reducer'

const platformReducers = {
  admin,
  browser,
  cordova,
  drawer,
  electron,
  flash,
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
