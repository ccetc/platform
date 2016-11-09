import admin from './admin'
import api from './api'
import authentication from './authentication'
import controllers from './controllers'
import jobs from './jobs'
import models from './models'
import queries from './queries'
import website from './website'

const config = {
  name: 'Platform',
  description: 'Platform',
  path: ''
}

export default {
  admin,
  api,
  authentication,
  controllers,
  config,
  jobs,
  models,
  queries,
  website
}
