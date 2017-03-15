import { resources } from 'platform/middleware/rest'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import after from './after'
import before from './before'
import logger from './logger'

export default resources({
  after: {
    create: after('expense', 'created'),
    update: after('expense', 'updated')
  },
  allowedParams: ['receipt_id','date','project_id','expense_type_id','vendor_id','description','amount','is_visa','approved_by_id','approved_at','is_approved','is_submitted','reason_rejected'],
  before,
  defaultSort: '-date',
  filterParams: ['expense_type_id','project_id','date','is_approved','is_visa'],
  logger: {
    create: logger('expense', 'created'),
    update: logger('expense', 'updated')
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
