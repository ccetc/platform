import express from 'express'
import bodyParser from 'body-parser'
import admin from './platform/client'
import platform from './platform'
import crm from './apps/crm'
import expenses from './apps/expenses'

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

// admin api routes
app.use(`/api/admin${platform.config.path}`, platform.api)
app.use(`/api/admin${crm.config.path}`, crm.api)
app.use(`/api/admin${expenses.config.path}`, expenses.api)

// admin routes
app.get('/admin*', admin)

// http app
http.listen(8080)

// https app
https.listen(8443)
