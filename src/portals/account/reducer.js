const Reducer = (state, action) => {

  const reducers = {
  }

  const portal = action.type.split('/')[0]
  const namespace = action.type.split('/')[1]

  if(reducers[namespace]) {

    return {
      ...state[portal],
      [namespace]: reducers[namespace](state[portal][namespace], action)
    }

  } else if(state === undefined) {

    return {
    }

  } else {

    return state

  }

}

export default Reducer
