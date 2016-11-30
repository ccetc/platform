import _ from 'lodash'

import chrome from './components/chrome/reducer'
import forgot from './components/forgot/reducer'
import notifications from './components/notifications/reducer'
import reset from './components/reset/reducer'
import session from './components/session/reducer'
import signin from './components/signin/reducer'

import collection from 'ui/components/collection/reducer'
import container from 'ui/components/container/reducer'
import infinite from 'ui/components/infinite/reducer'
import tabs from 'ui/components/tabs/reducer'

const Reducer = (state, action) => {

  const reducers = {
    chrome,
    forgot,
    notifications,
    reset,
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
      if(_.includes(['chrome','forgot','notifications','reset','session','signin'], namespace)) {
        return {
          ...state,
          [namespace]: reducers[namespace](state[namespace], action)
        }
      } else  {
        return {
          ...state,
          ...reducers[namespace](state, action)
        }
      }
    }


  } else if(state === undefined) {

    return {
      chrome: chrome(undefined, action),
      forgot: forgot(undefined, action),
      notifications: notifications(undefined, action),
      reset: reset(undefined, action),
      session: session(undefined, action),
      signin: signin(undefined, action),
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
