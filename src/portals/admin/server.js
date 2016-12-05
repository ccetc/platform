import { Router } from 'express'
import instance from 'server/middleware/instance'
import authentication from 'server/middleware/authentication'
import activation from 'server/middleware/activation'
import signin from 'server/middleware/signin'
import reset from 'server/middleware/reset'
import sessionService from './middleware/session'
import searchService from './middleware/search'
import instanceService from './middleware/instance'
import notificationsService from './middleware/notifications'
import fs from 'fs'
import path from 'path'

const admin = Router()

// load instance
admin.use(instance)
admin.use(instanceService)

// signin
admin.use(signin)

// account activation
admin.use(activation)

// password reset
admin.use(reset)

// authentication
admin.use(authentication)

// core admin api
admin.use(notificationsService)
admin.use(sessionService)
admin.use(searchService)

// app routes
fs.readdirSync(path.join(__dirname, '../../platform/apps')).filter(function(app) {
  const server = path.join(__dirname, '../../platform/apps', app, 'admin/server.js')
  if(fs.existsSync(server)) {
    admin.use(require(server).default)
  }
})
fs.readdirSync(path.join(__dirname, '../../apps')).filter(function(app) {
  const server = path.join(__dirname, '../../apps', app, 'admin/server.js')
  if(fs.existsSync(server)) {
    admin.use(`/${app}`, require(server).default)
  }
})


export default admin
