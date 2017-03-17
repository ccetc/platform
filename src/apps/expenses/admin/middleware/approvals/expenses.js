import { resources } from 'platform/middleware/rest'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import canApprove from './utils'
import activity from './activity'
import notification from './notification'
import processors from './processors'

export default resources({
  access: canApprove,
  actions: {
    approve: {
      activity: activity('expense', 'approved'),
      method: 'patch',
      notification: notification('expense', 'approved'),
      on: 'member',
      path: 'approve',
      processor: processors('expense', Expense, 'approve', true)
    },
    reject: {
      activity: activity('expense', 'rejected'),
      method: 'patch',
      notification: notification('expense', 'rejected'),
      on: 'member',
      path: 'reject',
      processor: processors('expense', Expense, 'reject', false)
    }
  },
  defaultSort: '-date',
  filterParams: ['user_id','expense_type_id','project_id','date','is_approved','is_visa'],
  model: Expense,
  name: 'expense',
  only: ['list','show','update'],
  ownedByUser: false,
  pathPrefix: '/approvals',
  query: (qb, req, filters) => {
    qb.joinRaw('inner join expenses_members on expenses_members.project_id = expenses_expenses.project_id and expenses_members.user_id=? and expenses_members.member_type_id != ?', [req.user.get('id'), 3])
    qb.whereNot('expenses_expenses.user_id', req.user.get('id'))
    qb.where(function() {
      this.where('expenses_expenses.is_submitted', true).orWhere('expenses_expenses.is_approved', false)
    })
  },
  serializer: ExpenseSerializer,
  sortParams: ['date'],
  withRelated: ['receipt','user.photo','project','expense_type','approved_by','vendor']
})
