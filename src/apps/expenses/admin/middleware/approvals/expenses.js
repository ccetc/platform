import { resources } from 'platform/middleware/rest'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import canApprove from './utils'

const loggers = require('./loggers').default('expense')
const notification = require('./notification').default('expense')
const processors = require('./processors').default('expense', Expense)

export default resources({
  access: canApprove,
  actions: {
    approve: {
      logger: loggers.approve,
      method: 'patch',
      notification: notification.approve,
      on: 'member',
      path: 'approve',
      processor: processors.approve
    },
    reject: {
      logger: loggers.reject,
      method: 'patch',
      notification: notification.reject,
      on: 'member',
      path: 'reject',
      processor: processors.reject
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
