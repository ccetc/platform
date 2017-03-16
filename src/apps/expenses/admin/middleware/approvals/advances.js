import { resources } from 'platform/middleware/rest'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import canApprove from './utils'

const loggers = require('./loggers').default('advance')
const notification = require('./notification').default('advance')
const processors = require('./processors').default('advance', Advance)

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
  defaultSort: '-date_needed',
  filterParams: ['user_id','expense_type_id','project_id','date_needed','is_approved'],
  model: Advance,
  name: 'advance',
  only: ['list','show','update'],
  ownedByUser: false,
  pathPrefix: '/approvals',
  query: (qb, req, filters) => {
    qb.joinRaw('inner join expenses_members on expenses_members.project_id = expenses_advances.project_id and expenses_members.user_id=? and expenses_members.member_type_id != ?', [req.user.get('id'), 3])
    qb.whereNot('expenses_advances.user_id', req.user.get('id'))
    qb.where(function() {
      this.where('expenses_advances.is_submitted', true).orWhere('expenses_advances.is_approved', false)
    })
  },
  serializer: AdvanceSerializer,
  sortParams: ['date'],
  withRelated: ['user.photo','project','expense_type','vendor']
})
