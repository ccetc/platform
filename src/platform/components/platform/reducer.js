import chrome from '../chrome/reducer'
import reset from '../reset/reducer'
import signin from '../signin/reducer'

const Reducer = (state, action) => {

  const reducers = {
    chrome,
    reset,
    signin
  }

  const namespace = action.type.split('/')[0]

  if(reducers[namespace]) {

    return {
      ...state,
      ...reducers[namespace](state[namespace], action)
    }

  } else if(state === undefined) {
    return {
      ...chrome(undefined, action),
      ...reset(undefined, action),
      ...signin(undefined, action)
    }

  } else {

    return state

  }

}

export default Reducer
