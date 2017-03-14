import { buildRoute, buildRouter } from './utils'

export default userOptions => {

  const route = buildRoute(userOptions)

  const router = buildRouter(route)

  return {
    router,
    route
  }

}
