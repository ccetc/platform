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
import crm from './apps/crm'
import expenses from './apps/expenses'

// create app
const app = express()

// create server
const server = http.createServer(app)
server.listen(8080)

// create websocket
const io = socketio(server)
io.adapter(redis(config.redis))
io.use(ioauth)

// enable cors
app.use(cors())

// body parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// job queue
app.use('/jobs', queue.app)

// logger
app.use(logger)

// public assets
app.use(express.static('dist/public'))

// admin api routes
app.use('/api/admin', platform.authentication)
app.use('/api/admin', webauth)
app.use(`/api/admin${platform.config.path}`, platform.api)
app.use(`/api/admin${crm.config.path}`, crm.api)
app.use(`/api/admin${expenses.config.path}`, expenses.api)
app.use('/api', exceptions)

// admin routes
app.get('/admin*', render(admin))
