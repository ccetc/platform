import chrome from './chrome/reducer'
import container from './container/reducer'
import forgot from './forgot/reducer'
import navigation from './navigation/reducer'
import notifications from './notifications/reducer'
import reset from './reset/reducer'
import session from './session/reducer'
import search from './search/reducer'
import signin from './signin/reducer'

import collection from 'ui/components/collection/reducer'
import form from 'ui/components/form/reducer'
import infinite from 'ui/components/infinite/reducer'
import tabs from 'ui/components/tabs/reducer'

const Reducer = (state, action) => {

  const reducers = {
    chrome,
    forgot,
    navigation,
    notifications,
    reset,
    session,
    search,
    signin,
    collection,
    container,
    form,
    infinite,
    tabs
  }

  const namespace = action.type.split('/')[0]

  if(reducers[namespace]) {

    if(action.cid) {
      return {
        ...state,
        [namespace]: {
          ...state[namespace],
          [action.cid]: reducers[namespace](state[namespace][action.cid], action)
        }
      }
    } else {
      return {
        ...state,
        [namespace]: reducers[namespace](state[namespace], action)
      }
    }


  } else if(state === undefined) {

    return {
      chrome: chrome(undefined, action),
      container: container(undefined, action),
      forgot: forgot(undefined, action),
      navigation: navigation(undefined, action),
      notifications: notifications(undefined, action),
      reset: reset(undefined, action),
      session: session(undefined, action),
      search: search(undefined, action),
      signin: signin(undefined, action),
      collection: collection(undefined, action),
      form: form(undefined, action),
      infinite: infinite(undefined, action),
      tabs: tabs(undefined, action)
    }

  } else {

    return state

  }

}

export default Reducer
