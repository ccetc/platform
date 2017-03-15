import advances from './middleware/items/advances'
import advanceApprovals from './middleware/approvals/advances'
import advanceReport from './middleware/reports/advances'
import expenses from './middleware/items/expenses'
import expenseTypes from './middleware/expense_types'
import expenseApprovals from './middleware/approvals/expenses'
import expenseReport from './middleware/reports/expenses'
import memberships from './middleware/memberships'
import memberTypes from './middleware/member_types'
import projects from './middleware/projects'
import trips from './middleware/items/trips'
import tripApprovals from './middleware/approvals/trips'
import tripReport from './middleware/reports/trips'
import vendors from './middleware/vendors'

export default [
  ...advanceApprovals.routes,
  ...advanceReport.routes,
  ...advances.routes,
  ...expenseApprovals.routes,
  ...expenseReport.routes,
  ...expenseTypes.routes,
  ...expenses.routes,
  ...memberships.routes,
  ...memberTypes.routes,
  ...projects.routes,
  ...tripApprovals.routes,
  ...tripReport.routes,
  ...trips.routes,
  ...vendors.routes
]
