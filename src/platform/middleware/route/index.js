import { Router } from 'express'
import { buildRoute } from './utils'

export const buildRouter = routes => {

  return Object.keys(routes).reduce((router, key) => {

    const route = routes[key]

    router[route.method](route.path, route.handler)

    return router

  }, Router({ mergeParams: true }))

}

export default userOptions => {

  return buildRoute(userOptions)

}
