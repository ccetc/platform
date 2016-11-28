import chrome from './components/chrome/reducer'
import drawer from './components/drawer/reducer'
import forgot from './components/forgot/reducer'
import notifications from './components/notifications/reducer'
import page from './components/page/reducer'
import search from './components/search/reducer'
import session from './components/session/reducer'
import signin from './components/signin/reducer'

import collection from 'ui/components/collection/reducer'
import container from 'ui/components/container/reducer'
import infinite from 'ui/components/infinite/reducer'
import tabs from 'ui/components/tabs/reducer'

const Reducer = (state, action) => {

  const reducers = {
    chrome,
    drawer,
    forgot,
    notifications,
    page,
    search,
    session,
    signin,
    collection,
    container,
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
        ...reducers[namespace](state, action)
      }
    }


  } else if(state === undefined) {

    return {
      ...chrome(undefined, action),
      ...drawer(undefined, action),
      ...forgot(undefined, action),
      ...notifications(undefined, action),
      ...page(undefined, action),
      ...search(undefined, action),
      ...session(undefined, action),
      ...signin(undefined, action),
      ...collection(undefined, action),
      ...infinite(undefined, action),
      ...tabs(undefined, action),
      container: []
    }

  } else {

    return state

  }

}

export default Reducer
