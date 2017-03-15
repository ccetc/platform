import _ from 'lodash'
import { succeed } from 'platform/utils/responses'
import { applyToRecords, coerceArray } from './utils'
import cache from './cache'
import log from './log'
import authenticator from './authenticator'

export default (options) => ({
  authenticator: defaultAuthenticator(options),
  authorizer: defaultAuthorizer(options),
  logger: defaultLogger(options),
  renderer: defaultRenderer(options),
  responder: defaultResponder(200, 'Success')
})

export const defaultAuthenticator = (options) => {

  return authenticator(options)

}

export const defaultAuthorizer = (options) => {

  return (req) => {

    return new Promise((resolve, reject) => {

      if(!options.rights) return resolve()

      const allowed = options.rights.reduce((allowed, right) => {
        return allowed ? _.includes(req.rights, right) : false
      }, true)

      if(!allowed) return reject({ code: 403, message: 'You do not have the rights to access this resource.' })

      resolve()

    }).then(() => {

      if(!options.access) return true

      return Promise.map(coerceArray(options.access), fn => fn(req))

    })

  }

}

export const defaultRenderer = (options) => {

  const renderer = (result) => {

    const serialize = () => {

      return options.serializer ? options.serializer(result) : result
      // return options.serializer ? options.serializer(result) : result.toJSON()

    }

    if(options.cacheFor) {

      const key = `${options.name}-${result.get('id')}-${result.get('updated_at')}`

      return cache(key, options.cacheFor, serialize)

    }

    return serialize()

  }

  return (req, result) => {

    if(!result) return null

    return (result.records) ? applyToRecords(req, result, renderer).then(result => result.records) : renderer(result)

  }

}

export const defaultLogger = (options) => {

  return (req, result) => {

    if(!options.logger) return result

    return Promise.resolve().then(() => {

      return options.logger(result)

    }).then(logger => {

      return log(req, logger).then(() => result)

    }).then(() => result)

  }

}

export const defaultResponder = (status, message) => {

  return (req, res, next, data) => {

    const extra = data ? { data } : null

    return succeed(res, status, message, extra)

  }

}
