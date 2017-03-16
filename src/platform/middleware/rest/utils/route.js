import { buildHandler } from './index'
import { validateOptions } from './options'

export const buildRoute = (userOptions) => {

  const checks = {
    valid: ['access','activity','after','authenticated','authorizer','alter','before','cacheFor','handler','logger','method','notifier','notification','path','processor','renderer','responder','rights','rules','serializer','story','verifier'],
    required: ['method','path']
  }

  validateOptions(userOptions, checks)

  const options = normalizeOptions(userOptions)

  const custom = (options) => ({})

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
