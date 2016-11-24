import { Router } from 'express'
import authentication from 'server/middleware/authentication'
import activation from 'server/middleware/activation'
import signin from 'server/middleware/signin'
import reset from 'server/middleware/reset'
import session from './middleware/session'
import search from './middleware/search'
import fs from 'fs'
import path from 'path'
import service from 'server/middleware/service'
import App from 'platform/models/app'
import Asset from 'platform/models/asset'
import User from 'platform/models/user'

const admin = Router()

// signin
admin.use(signin)

// account activation
admin.use(activation)

// password reset
admin.use(reset)

// authentication
admin.use(authentication)

// core admin api
admin.use(session)
admin.use(search)
admin.use('/apps', service(App))
admin.use('/assets', service(Asset))
admin.use('/users', service(User))

// app routes
const directories = ['../../platform/apps','../../apps']
directories.map(function(directory) {
  fs.readdirSync(path.join(__dirname, directory)).filter(function(app) {
    const server = path.join(__dirname, directory, app, 'admin/server.js')
    if(fs.existsSync(server)) {
      admin.use(`/${app}`, require(server).default)
    }
  })
})

export default admin
