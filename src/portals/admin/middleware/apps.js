import { Router } from 'express'
import fs from 'fs'
import path from 'path'

export const index = (req, res, next) => {

  let apps = {}
  const roots = ['../../../platform/apps', '../../../apps']
  roots.map(root => {
    fs.readdirSync(path.join(__dirname, root)).filter(app => {
      const config = path.join(__dirname, root, app, 'app.json')
      if(fs.existsSync(config)) {
        apps[app] = require(config)
      }
    })
  })

  res.json(apps)

}

const apps = Router()
apps.get('/apps', index)

export default apps
