import chrome from 'platform/admin/components/chrome/reducer'
import notifications from 'platform/admin/components/notifications/reducer'
import presence from 'platform/admin/components/presence/reducer'
import reset from 'platform/admin/components/reset/reducer'
import search from 'platform/admin/components/search/reducer'
import signin from 'platform/admin/components/signin/reducer'

const Reducer = (state, action) => {

  const reducers = {
    chrome,
    notifications,
    reset,
    presence,
    search,
    signin
  }

  const namespace = action.type.split('/')[0]

  if(reducers[namespace]) {

    return {
      ...state,
      ...reducers[namespace](state, action)
    }

  } else if(state === undefined) {
    return {
      ...chrome(undefined, action),
      ...notifications(undefined, action),
      ...presence(undefined, action),
      ...reset(undefined, action),
      ...search(undefined, action),
      ...signin(undefined, action)
    }

  } else {

    return state

  }

}

export default Reducer
