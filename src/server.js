import express from 'express'
import http from 'http'
import socket from 'socket.io'
import bodyParser from 'body-parser'
import queue from './services/queue'
import authentication from './server/middleware/authentication'
import logger from './server/middleware/logger'
import render from './server/middleware/render'
import exceptions from './server/middleware/exceptions'
import admin from './admin'
import platform from './platform'
import crm from './apps/crm'
import expenses from './apps/expenses'

const app = express()
const server = http.createServer(app)
const io = socket(server)

// body parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// job queue
app.use('/jobs', queue.app)

// logger
app.use(logger)

// public assets
app.use(express.static('dist/public'))

// websocket
io.on('connection', (channel) => {
})

// admin api routes
app.use('/api/admin', platform.authentication)
// app.use('/api/admin', authentication)
app.use(`/api/admin${platform.config.path}`, platform.api)
app.use(`/api/admin${crm.config.path}`, crm.api)
app.use(`/api/admin${expenses.config.path}`, expenses.api)
app.use('/api', exceptions)

// admin routes
app.get('/admin*', render(admin))

// http app
server.listen(8080)
