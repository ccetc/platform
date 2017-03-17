import _ from 'lodash'
import Promise from 'bluebird'
import { fail } from 'platform/utils/responses'
import { wrapWithLogger } from './logger'
import { defaultAuthenticator, defaultAuthorizer, defaultVerifier, defaultLogger, defaultNotifier, defaultRenderer, defaultResponder } from './defaults'

export const buildHandler = (builder, options) => {

  const built = builder(options)

  const components = buildHandlerComponents(options, built)

  return (req, res, next) => {

    const withHooks = () => wrapWithHooks(components, req, res, next)

    return wrapWithLogger(req, res, withHooks)

  }

}

export const wrapWithHooks = (components, req, res, next) => {

  const { authenticator, authorizer, verifier, before, processor, after, logger, notifier, renderer, alter, responder } = components

  return new Promise.resolve().then(() => {

    return authenticator ? authenticator(req) : true

  }).then(() => {

    return authorizer ? authorizer(req) : true

  }).then(() => {

    return verifier(req)

  }).then(() => {

    return runHooks(req, before)

  }).then(() => {

    return processor ? new Promise((resolve, reject) => processor(req, resolve, reject)) : null

  }).then(result => {

    return runHooks(req, after, result).then(() => result)

  }).then(result => {

    return logger ? Promise.resolve(logger(req, result)).then(() => result) : result

  }).then(result => {

    return notifier ? Promise.resolve(notifier(req, result)).then(() => result) : result

  }).then(result => {

    return renderer ? renderer(req, result) : result

  }).then(result => {

    return runHooks(req, alter, result)

  }).then(result => {

    return responder ? responder(req, res, next, result) : true

  }).catch(err => {

    if(_.isPlainObject(err)) {

      const extra = err.errors ? { errors: err.errors } : null

      return fail(res, err.code, err.message, extra)

    }

    if(process.env.NODE_ENV === 'development') console.log(err)

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

export const buildHandlerComponents = (options, built) => ({
  after: options.after,
  alter: options.alter,
  authenticator: options.authenticator || defaultAuthenticator(options),
  authorizer: options.authorizer || defaultAuthorizer(options),
  before: options.before,
  logger: defaultLogger(options.activity || built.activity),
  notifier: defaultNotifier(options.notification || built.notification),
  processor: options.processor || built.processor,
  renderer: options.renderer || built.renderer || defaultRenderer(options),
  responder: options.responder || built.responder || defaultResponder(200, 'Success'),
  verifier: options.verifier || defaultVerifier(options)
})

export const coerceArray = value => {

  return value ? (!_.isArray(value) ? [value] : value) : []

}

export const mergeParams = function() {

  return Array.apply(null, { length: arguments.length }).reduce((merged, value, index) => _.uniq([
    ...merged,
    ...coerceArray(arguments[index])
  ]), [])

}

// returns a flat list of all the nested keys in a hash
export const flattenKeys = (hash, prefix = '') => {

  return Object.keys(hash).reduce((keys, key) => [
    ...keys,
    ..._.isObject(hash[key]) ? flattenKeys(hash[key], `${prefix}${key}.`) : [`${prefix}${key}`]
  ], [])

}

export const toList = (arr) => {

  return arr.join(', ').replace(new RegExp(',$'), ', and')

}

export const defaultQuery = (req, options, qb, filters) => {

  const tableName = options.model.extend().__super__.tableName

  if(options.ownedByTeam) {
    qb = qb.where(`${tableName}.team_id`, req.team.get('id'))
  }

  if(options.ownedByUser) {
    qb = qb.where(`${tableName}.user_id`, req.user.get('id'))
  }

  if(options.query ) {
    options.query (qb, req, filters)
  }

  if(options.softDelete) {
    qb = qb.whereNull('deleted_at')
  }

  return qb

}

export const filterParams = (params, allowed) => {

  if(!params) return null

  return _.pick(params, allowed)

}
