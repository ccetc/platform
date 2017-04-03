import glob from 'glob'
import fs from 'fs'
import path from 'path'
import handler from './handler'

export default (portal) => {

  const configs = glob.sync('src/**/apps/**/app.js')

  return configs.reduce((routes, configFile) => {

    const config = require(path.resolve(configFile))

    const appName = configFile.split(path.sep).slice(-2, -1)[0]

    const appLoader = {
      method: 'use',
      path: `/${appName}`,
      handler: handler(config.title)
    }

    const serverFile = path.resolve(...[...configFile.split(path.sep).slice(0, -1), portal, 'server.js'])

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

}
