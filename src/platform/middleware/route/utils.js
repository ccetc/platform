import _ from 'lodash'
import Promise from 'bluebird'
import { validateOptions, normalizeOptions } from './options'
import { Router } from 'express'
import { fail } from 'platform/utils/responses'
import { wrapWithLogger } from './logger'
import action from './action'

export const coerceArray = value => {

  return value ? (!_.isArray(value) ? [value] : value) : []

}

export const buildRoute = (userOptions) => {

  validateOptions(userOptions)

  const options = normalizeOptions(userOptions)

  return {
    method: options.method,
    path: options.path,
    handler: options.handler || buildHandler(action, options)
  }

}

export const buildRouter = route => {

  const router = Router({ mergeParams: true })

  router[route.method](route.path, route.handler)

  return router

}

export const buildHandler = (builder, options) => {

  const defaults = builder(options)

  const { authenticator, authorizer, processor, renderer, responder, logger } = buildHandlerComponents(options, defaults.authorizer, defaults.authenticator, defaults.processor, defaults.renderer, defaults.responder, defaults.logger)

  return (req, res, next) => {

    const withHooks = () => wrapWithHooks(authenticator, authorizer, options.before, processor, options.after, logger, renderer, options.alter, responder, req, res, next)

    return wrapWithLogger(req, res, withHooks)

  }

}

// takes all actor components and assembles them into a promise chain
export const wrapWithHooks = (authenticator, authorizer, before, processor, after, logger, renderer, alter, responder, req, res, next) => {

  return new Promise.resolve().then(() => {

    return authenticator ? authenticator(req) : true

  }).then(() => {

    return authorizer ? authorizer(req) : true

  }).then(() => {

    return runHooks(req, before)

  }).then(() => {

    return processor ? processor(req) : null

  }).then(result => {

    return runHooks(req, after, result).then(() => result)

  }).then(result => {

    return logger ? logger(req, result): result

  }).then(result => {

    return renderer ? renderer(req, result) : result

  }).then(result => {

    return runHooks(req, alter, result)

  }).then(result => {

    if(responder) responder(req, res, next, result)

    return true

  }).catch(err => {

    if(process.env.NODE_ENV === 'development') console.log(err)

    if(_.isPlainObject(err)) {

      const extra = err.errors ? { errors: err.errors } : null

      return fail(res, err.code, err.message, extra)

    }

    return fail(res, 500, err.message)

  })

}

export const applyToRecords = (req, result, operations) => {

  return Promise.all(result.records.map(record => {

    return Promise.reduce(coerceArray(operations), (result, operation) => {

      return operation(req, result)

    }, record)

  })).then(records => {

    return {
      ...result,
      records
    }

  })

}

export const runHooks = (req, hooks, result = null) => {

  if(!hooks || hooks.length === 0) return Promise.resolve(result)

  return Promise.reduce(coerceArray(hooks), (result, hook) => {

    if(result) {
      return result.records ? applyToRecords(req, result, hook) : hook(req, result)
    }

    return hook(req)

  }, result).catch(err => {

    const error = (_.isString(err)) ? new Error(err) : err

    throw(error)

  })

}

export const buildHandlerComponents = (options, authenticator, authorizer, processor, renderer, responder, logger) => ({
  authenticator: options.authenticator || authenticator,
  authorizer: options.authorizer || authorizer,
  processor: options.processor || processor,
  renderer: options.renderer || renderer,
  responder: options.responder || responder,
  logger
})
