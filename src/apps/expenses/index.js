import server from './server'
import client from './client'

const config = {
  name: 'Expenses',
  description: 'Expense Reimbursement',
  path: '/expenses'
}

export { config }
export { server }
export { client }

export default {
  config,
  server,
  client
}
