import localforage from 'platform/services/localforage'

export default store => next => action => {

  const [ namespace, action_type ] = action.type.split('/')

  if(namespace !== 'local') {
    return next(action)
  }

  if(action_type === 'SET') {

    store.dispatch({
      type: action.request,
      key: action.key,
      value: action.value
    })

    return localforage.setItem(action.key, action.value, (err, value) => {

      if(err) {
        return store.dispatch({
          type: action.failure,
          err
        })
      }

      return store.dispatch({
        type: action.success,
        value
      })

    })
  }

  if(action_type === 'GET') {

    store.dispatch({
      type: action.request,
      key: action.key
    })

    return localforage.getItem(action.key, (err, value) => {

      if(err) {
        return store.dispatch({
          type: action.failure,
          err
        })
      }

      return store.dispatch({
        type: action.success,
        value
      })

    })

  }

  if(action_type === 'REMOVE') {

    store.dispatch({
      type: action.request,
      key: action.key
    })

    return localforage.removeItem(action.key, (err, value) => {

      if(err) {
        return store.dispatch({
          type: action.failure,
          err
        })
      }

      return store.dispatch({
        type: action.success
      })

    })

  }

}
