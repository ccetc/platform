import api from './api'
import authentication from './authentication'
import admin from './admin'
import website from './website'
import jobs from './jobs'

const config = {
  name: 'Platform',
  description: 'Platform',
  path: ''
}

export { admin }
export { api }
export { authentication }
export { config }
export { website }

export default {
  admin,
  api,
  authentication,
  config,
  jobs,
  website
}
