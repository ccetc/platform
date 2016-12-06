export default (reducer) => {

  return (state = {}, action) => {

    if(action.cid) {

      if(!state[action.cid]) {
        state[action.cid] = reducer(undefined, { type: null })
      }

      return {
        ...state,
        [action.cid]: reducer(state[action.cid], action)
      }

    } else  {

      return state

    }

  }

}
