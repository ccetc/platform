import reducer from 'ui/reducer'

import container from './container/reducer'
import cordova from './cordova/reducer'
import electron from './electron/reducer'
import drawer from './drawer/reducer'
import flash from './flash/reducer'
import forgot from './forgot/reducer'
import instance from './instance/reducer'
import modal from './modal/reducer'
import navigation from './navigation/reducer'
import notifications from './notifications/reducer'
import reset from './reset/reducer'
import session from './session/reducer'
import search from './search/reducer'
import signin from './signin/reducer'
import tabs from './tabs/reducer'
import tasks from './tasks/reducer'

const reducers = {
  container,
  cordova,
  electron,
  drawer,
  flash,
  forgot,
  instance,
  modal,
  navigation,
  notifications,
  reset,
  session,
  search,
  signin,
  tabs,
  tasks
}

export default reducer(reducers)
