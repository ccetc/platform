import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import Redis from 'socket.io-redis'
import http from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import exception from 'server/middleware/exception'
// import ioauth from 'server/middleware/ioauth'
import logger from 'server/middleware/logger'
import render from 'server/middleware/render'
import server from 'portals/server'
import admin from 'portals/admin/client'

dotenv.config({ path: '.env.' + process.env.NODE_ENV })

// create app
const app = express()

// create server
const transport = http.createServer(app)

const redis = Redis({
  host: process.env.REDIS_HOST || '',
  port: process.env.REDIS_PORT || '',
  db: process.env.REDIS_DB || ''
})

// create websocket
const io = socketio(transport)
io.adapter(redis)
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

// public assets
app.use(express.static('public'))

// admin routes
app.get('/admin*', render(admin))

transport.listen(process.env.APP_PORT, () => {
  console.log('App listening on port ', process.env.APP_PORT)
})
