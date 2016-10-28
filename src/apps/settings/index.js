import server from './server'
import client from './client'

const config = {
  name: 'Settings',
  description: 'Manage Settings',
  path: '/settings'
}

export { config }
export { server }
export { client }

export default {
  config,
  server,
  client
}
