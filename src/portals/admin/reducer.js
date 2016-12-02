import chrome from './components/chrome/reducer'
import forgot from './components/forgot/reducer'
import navigation from './components/navigation/reducer'
import notifications from './components/notifications/reducer'
import page from './components/page/reducer'
import reset from './components/reset/reducer'
import session from './components/session/reducer'
import search from './components/search/reducer'
import signin from './components/signin/reducer'

import collection from 'ui/components/collection/reducer'
import container from 'ui/components/container/reducer'
import form from 'ui/components/form/reducer'
import infinite from 'ui/components/infinite/reducer'
import tabs from 'ui/components/tabs/reducer'

const Reducer = (state, action) => {

  const reducers = {
    chrome,
    forgot,
    navigation,
    notifications,
    page,
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
      forgot: forgot(undefined, action),
      navigation: navigation(undefined, action),
      notifications: notifications(undefined, action),
      page: page(undefined, action),
      reset: reset(undefined, action),
      session: session(undefined, action),
      search: search(undefined, action),
      signin: signin(undefined, action),
      collection: collection(undefined, action),
      form: form(undefined, action),
      infinite: infinite(undefined, action),
      tabs: tabs(undefined, action),
      container: []
    }

  } else {

    return state

  }

}

export default Reducer
