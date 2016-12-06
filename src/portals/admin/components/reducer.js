import container from './container/reducer'
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

import multicomponent from 'ui/components/multicomponent/reducer'
import collection from 'ui/components/collection/reducer'
import form from 'ui/components/form/reducer'
import infinite from 'ui/components/infinite/reducer'

const Reducer = (state, action) => {

  const reducers = {
    container,
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
    tasks,
    collection,
    infinite,
    form
  }

  const namespace = action.type.split('/')[0]

  if(namespace === 'multicomponent') {

    return multicomponent(state, action, reducers[action.namespace])

  } else if(reducers[namespace]) {

    return {
      ...state,
      [namespace]: reducers[namespace](state[namespace], action)
    }

  } else if(state === undefined) {

    return {
      container: container(undefined, action),
      drawer: drawer(undefined, action),
      flash: flash(undefined, action),
      forgot: forgot(undefined, action),
      instance: instance(undefined, action),
      modal: modal(undefined, action),
      navigation: navigation(undefined, action),
      notifications: notifications(undefined, action),
      reset: reset(undefined, action),
      session: session(undefined, action),
      search: search(undefined, action),
      signin: signin(undefined, action),
      tabs: tabs(undefined, action),
      tasks: tasks(undefined, action),
      collection: collection(undefined, action),
      form: form(undefined, action),
      infinite: infinite(undefined, action)
    }

  } else {

    return state

  }

}

export default Reducer
