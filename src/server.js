require('platform/services/environment')

import express from 'express'
import Redis from 'socket.io-redis'
import http from 'http'
import socketio from 'socket.io'
import bodyParser from 'body-parser'
import multiparty from 'connect-multiparty'
import imagecache from 'platform/middleware/imagecache'
import notFound from 'platform/middleware/not_found'
import admin from 'admin/server'
import socket from 'admin/socket'
import path from 'path'

const app = express()
const transport = http.createServer(app)
const redis = Redis(process.env.REDIS_URL)
const io = socketio(transport)

io.adapter(redis)
io.on('connection', socket)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(multiparty({
  uploadDir: './tmp'
}))

app.use(imagecache({
  destination: path.resolve('cached'),
  sources: [
    `https://s3.amazonaws.com/${process.env.AWS_BUCKET}`,
    `http://${process.env.PLATFORM_DOMAIN}`
  ]
}))

app.use(express.static('public'))

app.use(admin)
app.use(notFound)

transport.listen(process.env.SERVER_PORT, () => {
  console.log('Server listening on port', process.env.SERVER_PORT)
})
