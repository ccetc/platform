import { Router } from 'express'
import authentication from 'server/middleware/authentication'
import activation from 'server/middleware/activation'
import signin from 'server/middleware/signin'
import reset from 'server/middleware/reset'
import extAuthentication from './middleware/authentication'
import resumable from './middleware/resumable'
import sessionService from './middleware/session'
import searchService from './middleware/search'
import teamService from './middleware/teams'
import notificationsService from './middleware/notifications'
import fs from 'fs'
import path from 'path'

const router = Router()

router.use('/admin', extAuthentication)

// load team
router.use('/api/admin', teamService)

// signin
router.use('/api/admin', signin)

// account activation
router.use('/api/admin', activation)

// password reset
router.use('/api/admin', reset)

// authentication
router.use('/api/admin', authentication)


// resumable
router.use('/api/admin', resumable)

// core admin api
router.use('/api/admin', notificationsService)
router.use('/api/admin', sessionService)
router.use('/api/admin', searchService)

// app routes
fs.readdirSync(path.join(__dirname, '../../platform/apps')).filter(function(app) {
  const server = path.join(__dirname, '../../platform/apps', app, 'admin/server.js')
  if(fs.existsSync(server)) {
    router.use('/api/admin', require(server).default)
  }
})
const roots = ['../../apps','../../workbench']
roots.map(root => {
  if(fs.existsSync(path.join(__dirname, root))) {
    fs.readdirSync(path.join(__dirname, root)).filter(function(app) {
      const server = path.join(__dirname, root, app, 'admin/server.js')
      if(fs.existsSync(server)) {
        router.use(`/api/admin/${app}`, require(server).default)
      }
    })
  }
})


export default router
