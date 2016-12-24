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
const directories = ['../../platform/apps','../../apps']
directories.map(function(directory) {
  fs.readdirSync(path.join(__dirname, directory)).filter(function(app) {
    const server = path.join(__dirname, directory, app, 'account/server.js')
    if(fs.existsSync(server)) {
      router.use(`/api/account/${app}`, require(server).default)
    }
  })
})

export default router
