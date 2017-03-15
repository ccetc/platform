import { buildHandler } from './index'
import { validateOptions } from './options'
import custom from '../actions/custom'

export const buildRoute = (userOptions) => {

  const checks = {
    valid: ['access','after','authenticated','authorizer','alter','before','cacheFor','handler','logger','method','path','processor','renderer','responder','rights','rules','serializer','story'],
    required: ['method','path']
  }

  validateOptions(userOptions, checks)

  const options = normalizeOptions(userOptions)

  return {
    method: options.method,
    path: options.path,
    handler: options.handler || buildHandler(custom, options)
  }

}

export const normalizeOptions = (userOptions) => {

  const defaultOptions = {
    authenticated: true
  }

  return {
    ...defaultOptions,
    ...userOptions
  }

}
