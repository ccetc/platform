import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const router = Router()

const roots = ['../../platform/apps', '../../apps', '../../workbench']
roots.map(root => {
  if(fs.existsSync(path.join(__dirname, root))) {
    fs.readdirSync(path.join(__dirname, root)).filter(apppath => {
      const server = path.join(__dirname, root, apppath, 'public/server.js')
      if(fs.existsSync(server)) {
        router.use(`/${apppath}`, require(server).default)
      }
    })
  }
})

export default router
