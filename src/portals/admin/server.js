import { Router } from 'express'
import team from 'server/middleware/team'
import authentication from 'server/middleware/authentication'
import activation from 'server/middleware/activation'
import signin from 'server/middleware/signin'
import reset from 'server/middleware/reset'
import extAuthentication from './middleware/authentication'
import resumable from './middleware/resumable'
import sessionService from './middleware/session'
import searchService from './middleware/search'
import teamService from './middleware/team'
import notificationsService from './middleware/notifications'
import fs from 'fs'
import path from 'path'

const admin = Router()

admin.use('/admin', extAuthentication)

// load team
admin.use('/api/admin', team)
admin.use('/api/admin', teamService)

// signin
admin.use('/api/admin', signin)

// account activation
admin.use('/api/admin', activation)

// password reset
admin.use('/api/admin', reset)

// authentication
admin.use('/api/admin', authentication)

// resumable
admin.use('/api/admin', resumable)

// core admin api
admin.use('/api/admin', notificationsService)
admin.use('/api/admin', sessionService)
admin.use('/api/admin', searchService)

// app routes
fs.readdirSync(path.join(__dirname, '../../platform/apps')).filter(function(app) {
  const server = path.join(__dirname, '../../platform/apps', app, 'admin/server.js')
  if(fs.existsSync(server)) {
    admin.use('/api/admin', require(server).default)
  }
})
fs.readdirSync(path.join(__dirname, '../../apps')).filter(function(app) {
  const server = path.join(__dirname, '../../apps', app, 'admin/server.js')
  if(fs.existsSync(server)) {
    admin.use(`/api/admin/${app}`, require(server).default)
  }
})


export default admin
