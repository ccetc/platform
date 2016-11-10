import config from './services/config'
import express from 'express'
import cors from 'cors'
import redis from 'socket.io-redis'
import http from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import queue from './services/queue'
import webauth from './server/middleware/webauth'
import ioauth from './server/middleware/ioauth'
import logger from './server/middleware/logger'
import render from './server/middleware/render'
import exceptions from './server/middleware/exceptions'
import admin from './admin'
import platform from './platform'

import fs from 'fs'
import path from 'path'

// create sys
const sys = express()

// create server
const server = http.createServer(sys)

// create websocket
const io = socketio(server)
io.adapter(redis(config.redis))
io.use(ioauth)

// enable cors
sys.use(cors())

// body parsing
sys.use(bodyParser.urlencoded({ extended: true }))
sys.use(bodyParser.json())

// job queue
sys.use('/jobs', queue.app)

// logger
sys.use(logger)

// public assets
sys.use(express.static('dist/public'))

// admin api routes
sys.use('/api/admin', platform.authentication)
sys.use('/api/admin', webauth)

sys.use(`/api/admin${platform.config.path}`, platform.api)
fs.readdirSync(path.join(__dirname, './apps')).filter(path => {
  const app = require(`./apps/${path}`).default
  sys.use(`/api/admin/${path}`, app.api)
})
sys.use('/api', exceptions)

// admin routes
sys.get('/admin*', render(admin))

server.listen(8080)
