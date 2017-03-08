import resources from 'platform/middleware/resources'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import after from './after'
import logger from './logger'

export default resources({
  after: {
    create: after('expense')
  },
  allowedParams: ['receipt_id','date','project_id','expense_type_id','vendor_id','description','amount','is_visa'],
  defaultSort: '-date',
  filterParams: ['expense_type_id','project_id','date','is_approved'],
  logger: {
    create: logger('expense')
  },
  model: Expense,
  name: 'expense',
  ownedByUser: true,
  path: 'expenses',
  rights: ['expenses.manage_expenses'],
  serializer: ExpenseSerializer,
  sortParams: ['date'],
  withRelated: ['receipt','user','project','expense_type','approved_by','vendor']
})