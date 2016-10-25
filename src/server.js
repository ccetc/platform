import express from 'express'
import bodyParser from 'body-parser'
import client from './platform/server/controllers/client'

const server = express()
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// public assets
const assets = express.static('dist/public')
server.use('/', assets)

// api routes
server.use('/api/settings', require('./apps/settings/server').default)
server.use('/api/crm', require('./apps/crm/server').default)

// client routes
server.get('/[^api]*', client)

// bind server
server.listen(3000)
