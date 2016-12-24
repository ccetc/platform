import { Router } from 'express'
import authentication from 'server/middleware/authentication'
import activation from 'server/middleware/activation'
import signin from 'server/middleware/signin'
import reset from 'server/middleware/reset'
import fs from 'fs'
import path from 'path'

const router = Router()

// signin
router.use('/api/account', signin)

// account activation
router.use('/api/account', activation)

// password reset
router.use('/api/account', reset)

// authentication
router.use('/api/account', authentication)

// app routes
const roots = ['../../platform/apps', '../../apps', '../../workbench']
roots.map(root => {
  if(fs.existsSync(path.join(__dirname, root))) {
    fs.readdirSync(path.join(__dirname, root)).filter(app => {
      const server = path.join(__dirname, root, app, 'account/server.js')
      if(fs.existsSync(server)) {
        router.use(`/api/account/${app}`, require(server).default)
      }
    })
  }
})

export default router
