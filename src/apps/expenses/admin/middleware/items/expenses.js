import { resources } from 'platform/middleware/rest'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import notification from './notification'
import before from './before'
import activity from './activity'

export default resources({
  activity: {
    create: activity('expense', 'created'),
    update: activity('expense', 'updated')
  },
  allowedParams: ['receipt_id','date','project_id','expense_type_id','vendor_id','description','amount','is_visa','approved_by_id','approved_at','is_approved','is_submitted','reason_rejected'],
  before,
  defaultSort: '-date',
  filterParams: ['expense_type_id','project_id','date','is_approved','is_visa'],
  model: Expense,
  name: 'expense',
  notification: {
    create: notification('expense', 'created'),
    update: notification('expense', 'updated')
  },
  ownedByUser: true,
  path: 'expenses',
  rights: ['expenses.manage_expenses'],
  serializer: ExpenseSerializer,
  sortParams: ['date'],
  withRelated: ['receipt','user','project','expense_type','approved_by','vendor']
})
