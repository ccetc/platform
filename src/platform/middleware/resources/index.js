import { buildRoutes, buildRouter } from './utils'

export default userOptions => {

  const namedRoutes = buildRoutes(userOptions)

  const routes = Object.keys(namedRoutes).map(key => namedRoutes[key])

  const router = buildRouter(namedRoutes)

  return {
    router,
    routes
  }

}
