import { Router } from 'express'
import authentication from 'server/middleware/authentication'
import activation from 'server/middleware/activation'
import signin from 'server/middleware/signin'
import reset from 'server/middleware/reset'
import fs from 'fs'
import path from 'path'

const account = Router()

// signin
account.use('/api/account', signin)

// account activation
account.use('/api/account', activation)

// password reset
account.use('/api/account', reset)

// authentication
account.use('/api/account', authentication)

// app routes
const directories = ['../../platform/apps','../../apps']
directories.map(function(directory) {
  fs.readdirSync(path.join(__dirname, directory)).filter(function(app) {
    const server = path.join(__dirname, directory, app, 'account/server.js')
    if(fs.existsSync(server)) {
      account.use(`/api/account/${app}`, require(server).default)
    }
  })
})

export default account
