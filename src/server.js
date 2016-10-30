import express from 'express'
import bodyParser from 'body-parser'
import client from './platform/controllers/client'
import platform from './platform'
import crm from './apps/crm'
import expenses from './apps/expenses'
import settings from './apps/settings'

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
app.use(`/api${crm.config.path}`, crm.server)
app.use(`/api${expenses.config.path}`, expenses.server)
app.use(`/api${settings.config.path}`, settings.server)

// client routes
app.get('/[^api]*', client)

// http app
http.listen(8080)

// https app
https.listen(8443)
