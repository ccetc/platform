import express from 'express'
import bodyParser from 'body-parser'
import client from './platform/server/controllers/client'

const server = express()
const http = require('http').Server(server)
const https = require('https').Server(server)
const io = require('socket.io')(http)

// body aprsing
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// public assets
server.use('/', express.static('dist/public'))

// api routes
server.use('/api/settings', require('./apps/settings/server').default)
server.use('/api/crm', require('./apps/crm/server').default)

// client routes
server.get('/[^api]*', client)

// websocket
io.on('connection', (socket) => {
})

// http app
http.listen(8080)

// https app
https.listen(8443)
