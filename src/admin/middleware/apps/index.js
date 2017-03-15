import fs from 'fs'
import path from 'path'
import app from './app'

const appPath = path.join(__dirname, '..', '..', '..', 'apps')

const routes = fs.readdirSync(appPath).reduce((routes, appName) => {

  const adminPath = path.join(appPath, appName, 'admin')
  const configPath = path.join(appPath, appName, 'app.js')

  if(!fs.existsSync(adminPath)) {
    return routes
  }

  const middlewarePath = path.join(adminPath, 'server')

  const config = require(configPath)

  const appLoader = {
    method: 'use',
    path: `/${appName}`,
    handler: app(config.title)
  }

  const appRoutes = require(middlewarePath).default.reduce((routes, route) => {
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
