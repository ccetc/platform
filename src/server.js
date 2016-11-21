import config from 'services/config'
import express from 'express'
import cors from 'cors'
import redis from 'socket.io-redis'
import http from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import queue from 'services/queue'
import exceptions from 'middleware/exceptions'
import ioauth from 'middleware/ioauth'
import logger from 'middleware/logger'
import render from 'middleware/render'
import webauth from 'middleware/webauth'
import admin from 'admin'

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
const authentication = require(path.join(__dirname, 'platform/admin/api/authentication')).default
sys.use('/api/admin', authentication)
sys.use('/api/admin', webauth)
const platform = require(path.join(__dirname, 'platform/admin/api')).default
sys.use('/api/admin', platform)
fs.readdirSync(path.join(__dirname, 'apps')).filter(apppath => {
  if(fs.exists(path.join(__dirname, 'apps', apppath, 'admin/api'))) {
    const app = require(path.join(__dirname, 'apps', apppath, 'admin/api')).default
    sys.use(`/api/admin/${apppath}`, app)
  }
})
sys.use('/api', exceptions)

// admin routes
sys.get('/admin*', render(admin))

server.listen(8080)
