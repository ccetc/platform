import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import apiMiddleware from './api_middleware'
import localStorageMiddleware from './local_storage_middleware'

const CreateStore = (reducer) => {

  const loggerMiddleware = createLogger()

  const middleware = [
    thunkMiddleware,
    loggerMiddleware,
    apiMiddleware,
    localStorageMiddleware
  ]

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

  return createStoreWithMiddleware(reducer)

}

export default CreateStore
