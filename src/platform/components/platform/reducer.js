import chrome from '../chrome/reducer'

const Reducer = (state, action) => {

  const reducers = {
    chrome
  }

  const namespace = action.type.split('/')[0]

  if(reducers[namespace]) {

    return {
      ...state,
      [namespace]: reducers[namespace](state[namespace], action)
    }

  } else if(state === undefined) {
    return {
      chrome: chrome(undefined, action)
    }

  } else {

    return state

  }

}

export default Reducer
