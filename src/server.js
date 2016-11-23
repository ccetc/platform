import config from 'server/services/config'
import express from 'express'
import cors from 'cors'
import redis from 'socket.io-redis'
import http from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import queue from 'server/services/queue'
import exception from 'server/middleware/exception'
// import ioauth from 'server/middleware/ioauth'
import logger from 'server/middleware/logger'
import render from 'server/middleware/render'
import server from 'portals/server'
import admin from 'portals/admin/client'

// create app
const app = express()

// create server
const transport = http.createServer(app)

// create websocket
const io = socketio(transport)
io.adapter(redis(config.redis))
// io.use(ioauth)

// enable cors
app.use(cors())

// body parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// logger
app.use(logger)

// api
app.use(server)
app.use(exception)

// job queue
app.use('/jobs', queue.app)

// public assets
app.use(express.static('public'))

// admin routes
app.get('/admin*', render(admin))

transport.listen(8080, () => {
  console.log('Listening')
})
