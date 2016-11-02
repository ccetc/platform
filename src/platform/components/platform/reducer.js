import chrome from '../chrome/reducer'
import session from '../session/reducer'

const Reducer = (state, action) => {

  const reducers = {
    chrome,
    session
  }

  const namespace = action.type.split('/')[0]

  if(reducers[namespace]) {

    return {
      ...state,
      [namespace]: reducers[namespace](state[namespace], action)
    }

  } else if(state === undefined) {
    return {
      chrome: chrome(undefined, action),
      session: session(undefined, action)
    }

  } else {

    return state

  }

}

export default Reducer
