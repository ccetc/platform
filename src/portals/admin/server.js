import { Router } from 'express'
import instance from 'server/middleware/instance'
import authentication from 'server/middleware/authentication'
import activation from 'server/middleware/activation'
import signin from 'server/middleware/signin'
import reset from 'server/middleware/reset'
import extAuthentication from './middleware/authentication'
import sessionService from './middleware/session'
import searchService from './middleware/search'
import instanceService from './middleware/instance'
import notificationsService from './middleware/notifications'
import fs from 'fs'
import path from 'path'

const admin = Router()

admin.use('/admin', extAuthentication)

// load instance
admin.use('/api/admin', instance)
admin.use('/api/admin', instanceService)

// signin
admin.use('/api/admin', signin)

// account activation
admin.use('/api/admin', activation)

// password reset
admin.use('/api/admin', reset)

// authentication
admin.use('/api/admin', authentication)

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
