import { Router } from 'express'
import { buildRoute } from './utils/route'
import { buildResources } from './utils/resources'
import { buildResource } from './utils/resource'

export const buildRouter = segments => {

  return segments.reduce((router, options) => {

    return Object.keys(options.routes).reduce((router, key) => {

      const route = options.routes[key]

      const path = options.prefix ? options.prefix + route.path : route.path

      router[route.method](path, route.handler)

      return router

    }, router)

  }, Router({ mergeParams: true }))

}

export const route = userOptions => {

  return buildRoute(userOptions)

}

export const resources = userOptions => {

  return buildResources(userOptions)

}

export const resource = userOptions => {

  return buildResource(userOptions)

}
