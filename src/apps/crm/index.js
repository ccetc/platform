import server from './server'
import client from './client'

const config = {
  name: 'CRM',
  description: 'Manage Contacts',
  path: '/crm'
}

export { config }
export { server }
export { client }

export default {
  config,
  server,
  client
}
