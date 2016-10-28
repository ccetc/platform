import express from 'express'
import bodyParser from 'body-parser'
import client from './platform/server/controllers/client'
import platform from './platform'
import settings from './apps/settings'
import crm from './apps/crm'

const app = express()
const http = require('http').Server(app)
const https = require('https').Server(app)
const socket = require('socket.io')(http)

// body parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// public assets
app.use('/', express.static('dist/public'))

// websocket
socket.on('connection', (channel) => {
})

// api routes
app.use(`/api${platform.config.path}`, platform.server)
app.use(`/api${settings.config.path}`, settings.server)
app.use(`/api${crm.config.path}`, crm.server)

// client routes
app.get('/[^api]*', client)

// http app
http.listen(8080)

// https app
https.listen(8443)
