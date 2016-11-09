import admin from './admin'
import api from './api'
import controllers from './controllers'
import jobs from './jobs'
import models from './models'
import queries from './queries'
import website from './website'

const config = {
  name: 'CRM',
  description: 'Manage Contacts',
  path: '/crm'
}

export default {
  admin,
  api,
  controllers,
  config,
  jobs,
  models,
  queries,
  website
}
