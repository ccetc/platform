import { Router } from 'express'
import authentication from 'middleware/authentication'
import activation from 'middleware/activation'
import signin from 'middleware/signin'
import reset from 'middleware/reset'
import fs from 'fs'
import path from 'path'

const account = Router()

// signin
account.use(signin)

// account activation
account.use(activation)

// password reset
account.use(reset)

// authentication
account.use(authentication)

// app routes
const root = path.resolve('.')
const directories = ['src/platform/apps','src/apps']
directories.map(function(directory) {
  fs.readdirSync(path.join(root, directory)).filter(function(app) {
    const server = path.join(root, directory, app, 'account/server.js')
    if(fs.existsSync(server)) {
      account.use(`/${app}`, require(server).default)
    }
  })
})

export default account
