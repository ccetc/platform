import fs from 'fs'
import path from 'path'
import app from './app'

const appPath = path.join(__dirname, '..', '..', '..', 'apps')

const routes = fs.readdirSync(appPath).reduce((routes, appName) => {

  const configFile = path.join(appPath, appName, 'app.js')

  if(!fs.existsSync(configFile)) {
    return routes
  }

  const config = require(configFile)

  const appLoader = {
    method: 'use',
    path: `/${appName}`,
    handler: app(config.title)
  }

  const serverFile = path.join(appPath, appName, 'admin', 'server')

  if(!fs.existsSync(serverFile)) {
    return routes
  }

  const appRoutes = require(serverFile).default.reduce((routes, route) => {
    return [
      ...routes,
      {
        ...route,
        path: `/${appName}${route.path}`
      }
    ]
  }, [appLoader])

  return [
    ...routes,
    ...appRoutes
  ]

}, [])

export default routes
