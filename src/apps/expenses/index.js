import api from './api'
import admin from './admin'
import website from './website'

const config = {
  name: 'Expenses',
  description: 'Expense Reimbursement',
  path: '/expenses'
}

export { admin }
export { api }
export { config }
export { website }

export default {
  admin,
  api,
  config,
  website
}
